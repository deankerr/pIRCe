import {
  PrismaClient,
  type ImageModel,
  type Message,
  type Profile,
  type Route,
} from '@prisma/client'

import { EventMessage } from '../../types.js'

export const prisma = new PrismaClient()

export type BotEvent = {
  route: Route
  message: Message
  options: Options
}

export type ChatEvent = {
  route: Route
  message: Message
  options: Options
  profile: Profile
  chatModel: OpenChatModel
}

export type ImageEvent = {
  route: Route
  message: Message
  options: Options
  imageModel: ImageModel
}

export type OpenChatModel = Awaited<ReturnType<typeof getChatModel>>
export type Options = Awaited<ReturnType<typeof getOptions>>

export async function getRoutesForTarget(server: string, target: string) {
  const targetList = [target, '*', target.startsWith('#') ? '#' : '?']

  const routes = await prisma.route.findMany({
    where: { server: { in: [server, '*'] }, target: { in: targetList } },
    include: {
      profile: true,
    },
  })
  return routes
}

export async function getChatModel(id: string) {
  const model = await prisma.chatModel.findUniqueOrThrow({ where: { id } })
  return model
}

export async function getImageModel(id: string) {
  return await prisma.imageModel.findUniqueOrThrow({ where: { id } })
}

export async function createMessage(ircMessage: EventMessage) {
  const msg = await prisma.message.create({
    data: { ...ircMessage, content: ircMessage.content.trim() },
  })
  return msg
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
  })
  return msg
}

export async function getMessageTag(message: Message, key: string) {
  const tag = await prisma.tag.findFirst({
    where: {
      messageID: message.id,
      key,
    },
  })

  return tag
}

export async function getOptions() {
  const options = await prisma.options.findFirstOrThrow({})
  const moderationProfile = JSON.parse(options.moderationProfile) as string[]
  return { ...options, moderationProfile }
}

export async function getWordList() {
  return await prisma.wordList.findMany({})
}

// retrieve same profile tagged and/or local messages
export async function getContextualMessages(botEvent: ChatEvent) {
  const { profile, message } = botEvent
  const { maxHistorySize, numIncludeContextual } = profile
  const { server, target } = message

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
    take: -maxHistorySize,
  })
  const relatedIDs = related.map((r) => r.id)

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
      take: -numIncludeContextual,
    })
  ) // filter duplicates
    .filter((m) => !relatedIDs.includes(m.id))

  // combine list, sort into id order
  const contextual = [...related, ...local].sort((a, b) => a.id - b.id)

  return contextual
}
