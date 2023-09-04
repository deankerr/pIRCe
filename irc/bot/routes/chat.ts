import debug from "debug";

import { ai } from "../api/ai.js";
import { createTag, getContextualMessages } from "../api/db.js";
import { command } from "../command.js";
import type { ChatEvent } from "../types.js";

const log = debug("pIRCe:chat");

export async function chat(botEvent: ChatEvent) {
  const { profile, message, route } = botEvent;

  const contextual = await getContextualMessages(botEvent);

  log("%m", profile.prompt);
  log("%m", message);

  const result = await ai.chat(botEvent, contextual);

  if (!result || result instanceof Error) return log("chat failed");

  log("%m {%s}", result.message.content, result.finish_reason ?? "?");

  await createTag(message, profile.id);
  const target = route.overrideOutputTarget
    ? route.overrideOutputTarget
    : message.target;
  void command.say(target, result.message.content ?? "", profile.id);
}
