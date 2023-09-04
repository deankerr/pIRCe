import debug from "debug";

import { ai } from "../api/ai.js";
import { createTag, getContextualMessages } from "../api/db.js";
import { command } from "../command.js";
import type { ChatEvent, BotEvent, AIChatMessage } from "../types.js";
import type { Message, Model, Profile } from "@prisma/client";
import { buildOpenChatMessages } from "../util/input.js";

const log = debug("pIRCe:chat");

export async function chat(botEvent: BotEvent) {
  try {
    const chatEvent = createChatEvent(botEvent);
    const { profile, message, route, model } = chatEvent;

    const contextual = await getContextualMessages(chatEvent);
    let messages = buildOpenChatMessages(profile, contextual);

    if (model.url.includes("openai.com")) {
      const moderated = await moderateMessages(messages, message);
      if (!moderated) return log("chat failed");
      messages = moderated;
    }

    const result = await ai.chat(model, messages);

    if (!result || result instanceof Error) return log("chat failed");

    log("%s {%s}", result.message.content, result.finish_reason ?? "?");

    await createTag(message, profile.id);
    const target = route.overrideOutputTarget
      ? route.overrideOutputTarget
      : message.target;
    void command.say(target, result.message.content ?? "", profile.id);
  } catch (error) {
    log(error);
  }
}

async function moderateMessages(
  messages: AIChatMessage[],
  userMessage: Message,
) {
  const modResults = await ai.moderateMessages(messages);
  if (modResults instanceof Error) throw modResults;

  let abort = false;
  messages.filter((msg, i) => {
    const result = modResults[i];
    if (!result) throw new Error("Invalid moderation result");

    const allowed = result.length === 0;

    if (!allowed && msg.role === "system") {
      log("Moderation failed on system prompt: %o", msg.content);
      abort = true;
    }

    if (!allowed && msg.content === userMessage.content) {
      log("Moderation failed: %o", msg.content);
      abort = true;
    }

    return allowed;
  });

  return abort ? null : messages;
}

function createChatEvent(botEvent: BotEvent): ChatEvent {
  if ("profile" in botEvent.route && "model" in botEvent.route) {
    const profile = botEvent.route.profile as Profile;
    const model = botEvent.route.model as Model;
    return { ...botEvent, profile, model };
  } else {
    throw new Error("BotEvent missing profile/model");
  }
}
