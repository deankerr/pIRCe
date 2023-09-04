import debug from "debug";

import { ai } from "../api/ai.js";
import { createTag, getContextualMessages } from "../api/db.js";
import { command } from "../command.js";
import type { ChatEvent, BotEvent } from "../types.js";
import { type Model, type Profile } from "@prisma/client";

const log = debug("pIRCe:chat");

export async function chat(botEvent: BotEvent) {
  const chatEvent = createChatEvent(botEvent);
  const { profile, message, route } = chatEvent;

  const contextual = await getContextualMessages(chatEvent);

  log("%m", profile.prompt);
  log("%m", message);

  const result = await ai.chat(chatEvent, contextual);

  if (!result || result instanceof Error) return log("chat failed");

  log("%m {%s}", result.message.content, result.finish_reason ?? "?");

  await createTag(message, profile.id);
  const target = route.overrideOutputTarget
    ? route.overrideOutputTarget
    : message.target;
  void command.say(target, result.message.content ?? "", profile.id);
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
