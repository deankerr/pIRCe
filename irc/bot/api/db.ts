import type { Message, Profile as RawProfile } from '@prisma/client'
import type { IRCEventMessage, ModelParameters, Profile } from '../types.js'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function getHandlers() {
  const handlers = await prisma.handler.findMany({
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

  return handlers.map((handler) => {
    const profile = parseProfileParameters(handler.profile)
    const model = handler.profile?.model ?? null
    const platform = handler.profile?.model?.platform ?? null
    return {
      handler,
      profile,
      model,
      platform,
    }
  })
}

function parseProfileParameters(profile: RawProfile | null) {
  if (!profile) return profile
  const parameters = JSON.parse(profile.parameters) as ModelParameters
  return { ...profile, parameters }
}

export async function createMessage(ircMessage: IRCEventMessage) {
  const msg = await prisma.message.create({
    data: { ...ircMessage, content: ircMessage.content.trim() },
  })
  return msg
}

export async function createConversationTag(profile: Profile, message: Message) {
  return await prisma.conversationTag.create({
    data: {
      profileID: profile.id,
      profileVersion: profile.version,
      messageID: message.id,
    },
  })
}

// export async function getMessageTag(message: Message, key: string) {
//   const tag = await prisma.tag.findFirst({
//     where: {
//       messageID: message.id,
//       key,
//     },
//   })

//   return tag
// }

export async function getOptions() {
  const options = await prisma.options.findFirstOrThrow({})
  const moderationProfile = JSON.parse(options.moderationProfile) as string[]
  return { ...options, moderationProfile }
}

export async function getWordList() {
  return await prisma.wordList.findMany({})
}

// retrieve same profile tagged and/or local messages
export async function getContextualMessages(message: Message, profile: Profile) {
  // const { conversationLength, contextualLength } = profile
  const conversationLength = profile.maxHistoryLength ?? 0
  const contextualLength = profile.maxLocalIRCLength ?? 0
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
          profileVersion: profile.version,
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
