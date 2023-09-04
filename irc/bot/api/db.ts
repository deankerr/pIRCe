import { PrismaClient, type Message } from "@prisma/client";

import type { EventMessage, ChatEvent } from "../types.js";

export const prisma = new PrismaClient();

export async function getRoutesForTarget(server: string, target: string) {
  const targetList = [target, "*", target.startsWith("#") ? "#" : "?"];

  const routes = await prisma.route.findMany({
    where: { server: { in: [server, "*"] }, target: { in: targetList } },
    include: {
      profile: true,
      model: true,
    },
  });
  return routes;
}

export async function getModel(id: string) {
  const model = await prisma.model.findUniqueOrThrow({ where: { id } });
  return model;
}

export async function createMessage(ircMessage: EventMessage) {
  const msg = await prisma.message.create({
    data: { ...ircMessage, content: ircMessage.content.trim() },
  });
  return msg;
}

export async function createTag(message: Message, key: string, value?: string) {
  const msg = await prisma.tag.create({
    data: {
      message: {
        connect: { id: message.id },
      },
      key,
      value,
    },
  });
  return msg;
}

export async function getMessageTag(message: Message, key: string) {
  const tag = await prisma.tag.findFirst({
    where: {
      messageID: message.id,
      key,
    },
  });

  return tag;
}

export async function getOptions() {
  const options = await prisma.options.findFirstOrThrow({});
  const moderationProfile = JSON.parse(options.moderationProfile) as string[];
  return { ...options, moderationProfile };
}

export async function getWordList() {
  return await prisma.wordList.findMany({});
}

// retrieve same profile tagged and/or local messages
export async function getContextualMessages(botEvent: ChatEvent) {
  const { profile, message } = botEvent;
  const { conversationLength, contextualLength } = profile;
  const { server, target } = message;

  // get related tagged
  const related = await prisma.message.findMany({
    where: {
      id: { lt: message.id }, // before current message
      server,
      target,
      tag: {
        some: {
          key: profile.id,
        },
      },
    },
    take: -conversationLength,
  });
  const relatedIDs = related.map((r) => r.id);

  // get local
  const local = (
    await prisma.message.findMany({
      where: {
        id: { lt: message.id }, // before current message
        server,
        target,
        tag: {
          none: {}, // not tagged with any other profile
        },
      },
      take: -contextualLength,
    })
  ) // filter duplicates
    .filter((m) => !relatedIDs.includes(m.id));

  // combine list, sort into id order
  const contextual = [...related, ...local].sort((a, b) => a.id - b.id);
  // add user message
  contextual.push(message);
  return contextual;
}
