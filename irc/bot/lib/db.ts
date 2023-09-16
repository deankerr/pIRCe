import type { Message, Profile } from '@prisma/client'
import type { IRCEventMessage } from '../types.js'
import { PrismaClient } from '@prisma/client'
import { parseJsonList } from './validate.js'

export const prisma = new PrismaClient()

export async function getHandlers() {
  return await prisma.handler.findMany({
    include: {
      profile: {
        include: {
          model: {
            include: {
              platform: true,
            },
          },
        },
      },
    },
  })
}

export async function createMessage(ircMessage: IRCEventMessage) {
  const msg = await prisma.message.create({
    data: { ...ircMessage, content: ircMessage.content.trim() },
  })

  return msg
}

export function createConversationTags(profile: Profile, ...message: Message[]) {
  const tags = message.map(async (msg) => {
    return await prisma.conversationTag.create({
      data: {
        profileID: profile.id,
        messageID: msg.id,
      },
    })
  })

  return tags
}

export async function getOptions() {
  const options = await prisma.options.findFirstOrThrow({})

  const moderationProfileList = parseJsonList(options.moderationProfileList)
  const wordFilterList = parseJsonList(options.wordFilterList)

  return { ...options, moderationProfileList, wordFilterList }
}

// retrieve same profile tagged and/or local messages
export async function getContextualMessages(message: Message, profile: Profile) {
  const conversationLength = profile.maxConversationLength ?? 0
  const contextualLength = profile.maxLocalMessageLength ?? 0
  const { server, target } = message

  // get related tagged
  const related = await prisma.message.findMany({
    where: {
      id: { lt: message.id }, // before current message
      server,
      target,
      conversationTag: {
        some: {
          profileID: profile.id,
        },
      },
    },
    take: -conversationLength,
  })
  const relatedIDs = related.map((r) => r.id)

  // get local
  const local = (
    await prisma.message.findMany({
      where: {
        id: { lt: message.id }, // before current message
        server,
        target,
        conversationTag: {
          none: {}, // not tagged with any other profile
        },
      },
      take: -contextualLength,
    })
  ) // filter duplicates
    .filter((m) => !relatedIDs.includes(m.id))

  // combine list, sort into id order
  const contextual = [...related, ...local].sort((a, b) => a.id - b.id)
  // add user message
  contextual.push(message)
  return contextual
}
