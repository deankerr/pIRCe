/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Message, Model } from "@prisma/client";
import axios, { isAxiosError } from "axios";
import debug from "debug";

import type {
  AIChatResponse,
  ChatEvent,
  ImageEvent,
  OpenAIImageResponseB64,
  OpenAIModerationResponse,
  Options,
} from "../types.js";

const log = debug("pIRCe:ai");

// TODO count tokens (somewhere)
async function chat(botEvent: ChatEvent, contextual: Message[]) {
  try {
    const { chatModel, options, profile, message } = botEvent;
    const { id, url, parameters } = chatModel;
    log("chat %o", id);

    const moderated = await moderate(botEvent, contextual);
    if (!moderated.success) return log("moderation failed");

    const prompt = buildOpenChatPrompt(
      profile.prompt,
      moderated.contextual,
      message,
      profile.promptTail,
    );
    log("%O", prompt);

    const params = JSON.parse(parameters) as Record<string, string>;

    const data = {
      ...params,
      messages: prompt,
    };
    log(data);

    const config = getAxiosConfig(url, options);
    const response = await axios<AIChatResponse>({ ...config, data });

    return response.data.choices[0];
  } catch (error) {
    return handleError(error);
  }
}

const moderationCache = {
  profile: "",
  message: new Map<number, boolean>(),
  text: new Map<string, boolean>(),
};

async function moderate(botEvent: ChatEvent, contextual: Message[]) {
  try {
    const { chatModel, options, message, profile } = botEvent;
    const { moderationProfile } = options;

    // only moderate openAI
    if (!chatModel.url.includes("openai.com")) {
      return { success: true, contextual };
    }

    const log = debug("pIRCe:moderation");

    // invalidate cache on profile change
    if (moderationCache.profile !== moderationProfile.join(",")) {
      moderationCache.profile = moderationProfile.join(",");
      moderationCache.message.clear();
      moderationCache.text.clear();
    }

    // TODO cache
    const prompts = profile.prompt + profile.promptTail ?? "";
    const messages = [message, ...contextual].map(
      (m) => `${m.nick}: ${m.content}`,
    );

    const input = [prompts, ...messages];
    const config = getAxiosConfig(
      "https://api.openai.com/v1/moderations",
      options,
    );
    const data = { input };
    const response = await axios<OpenAIModerationResponse>({ ...config, data });

    const rejectedCategories = response.data.results.map((result) => {
      // get flagged keys, remove allowed, return remaining objectional keys
      const categories = result.categories as Record<string, boolean>;
      const flaggedKeys = Object.keys(categories).filter((k) => categories[k]);
      return flaggedKeys.filter((k) => !moderationProfile.includes(k));
    });

    const results = {
      prompts: rejectedCategories[0],
      message: rejectedCategories[1],
      contextual: rejectedCategories.slice(2),
    };
    log("%O", results);

    const promptsStatus = results.prompts?.length === 0;
    moderationCache.text.set(prompts, promptsStatus);
    if (!promptsStatus) log("[Rejected] System Prompt %o", results.prompts);

    const messageStatus = results.message?.length === 0;
    moderationCache.message.set(message.id, messageStatus);
    if (!messageStatus) log("[Rejected] %m %o", message, results.message);

    const contextualFiltered = contextual.filter((msg, i) => {
      const status =
        results.contextual[i] !== undefined &&
        results.contextual[i]?.length === 0;
      moderationCache.message.set(msg.id, status);
      if (!status) log("[Rejected] %m %o", msg, results.contextual[i]);
      return status;
    });

    return {
      success: promptsStatus && messageStatus,
      contextual: contextualFiltered,
    };
  } catch (error) {
    handleError(error);
    return { success: false, contextual: [] };
  }
}

async function image(imageEvent: ImageEvent) {
  try {
    const log = debug("pIRCe:api.image");

    const { imageModel, message, options } = imageEvent;
    const { id, url, ...parameters } = imageModel;
    log("%o %m", id, message);

    const config = getAxiosConfig(url, options);
    // TODO trigger removal
    const data = {
      ...parameters,
      prompt: message.content.replace(/^@\w*\s/, ""),
    };

    const response = await axios<OpenAIImageResponseB64>({ ...config, data });

    log(response.data);
    const result = response.data.data[0]?.b64_json;
    if (!result) throw new Error("Result is undefined");
    return { result };
  } catch (error) {
    if (isAxiosError(error) && error?.response?.data) {
      const { data } = error.response;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const code = data?.error?.code;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const message = data?.error?.message;
      if (
        typeof code === "string" &&
        code === "content_policy_violation" &&
        typeof message === "string"
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        log(data.error);
        return {
          error: message,
        };
      }
    }

    return handleError(error);
  }
}

export const ai = { chat, image };

function getAxiosConfig(url: string, options: Options) {
  return {
    method: "post",
    url,
    headers: getBackendHeaders(url),
    timeout: options.apiTimeoutMs,
    timeoutErrorMessage: "Error: AI Request Timeout",
  };
}

function getBackendID(model: Model | string) {
  const url = typeof model === "string" ? model : model.url;
  if (url.includes("openai.com")) return "openai" as const;
  if (url.includes("openrouter.ai")) return "openrouter" as const;
  throw new Error("Unknown backend: " + url);
}

function getBackendHeaders(url: string) {
  const backendID = getBackendID(url);

  switch (backendID) {
    case "openai":
      return { Authorization: `Bearer ${getEnv("OPENAI_API_KEY")}` };
    case "openrouter":
      return {
        Authorization: `Bearer ${getEnv("OPENROUTER_API_KEY")}`,
        "HTTP-Referer": getEnv("OPENROUTER_YOUR_SITE_URL"),
        "X-Title": getEnv("OPENROUTER_YOUR_APP_NAME"),
      };
    default:
      throw new Error(`Unknown backend`);
  }
}

function getEnv(key: string) {
  if (!process.env[key]) throw new Error(`${key} not set`);
  return process.env[key];
}

const roles = {
  system: "system",
  user: "user",
  assistant: "assistant",
} as const;

// TODO proper command striping/nick replace
function buildOpenChatPrompt(
  system: string,
  conversation: Message[],
  message: Message,
  tail?: string | null,
) {
  const messages = [...conversation, message].map((msg) => {
    if (msg.self) {
      return { role: roles.assistant, content: msg.content };
    } else {
      return {
        role: roles.user,
        name: msg.nick.replaceAll(/[^a-zA-Z0-9_]/g, "_"),
        content: msg.content,
      };
    }
  });

  const prompt = [{ role: roles.system, content: system }, ...messages];

  if (tail) {
    prompt.push({ role: roles.system, content: tail });
  }

  return prompt;
}

function handleError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response) {
      // API error
      const { status, statusText, data } = error.response;
      log("*** API Response Error ***");
      log("Status: (%s) %s", status, statusText);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      "error" in data ? log("%o", data?.error) : log("%O", data);

      return error;
    } else if (error.request) {
      // No response received
      log("*** API Request Error ***");
      log(error.request);
      log(error.message);
      return error;
    } else {
      // Error creating request
      log("*** API Create Request Error ***");
      log(error.message);

      return error;
    }
  } else {
    if (error instanceof Error) {
      // something unrelated to axios
      log("*** Unknown API Error ***");
      log(error);

      return error;
    } else {
      // something happened ???
      throw new Error("Unknown error error");
    }
  }
}
