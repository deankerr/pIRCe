import { PrismaClient, type Message, type Options, type Profile, type Route } from '@prisma/client'

import { EventMessage } from '../../types.js'

export const prisma = new PrismaClient()

export type BotEvent = {
  route: Route
  profile: Profile | null
  chatModel: OpenChatModel | null
  message: Message
  options: Options
}

export type OpenChatModel = Awaited<ReturnType<typeof getChatModel>>

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
  const rawModel = await prisma.chatModel.findUniqueOrThrow({ where: { id } })
  const { stop, logit_bias, transforms, top_k, url } = rawModel

  const backend = url.includes('openai.com')
    ? ('openAI' as const)
    : url.includes('openrouter.ai')
    ? ('openRouter' as const)
    : null

  if (!backend) throw new Error('Unrecognised backend provider/URL: ' + url)

  const model = {
    ...rawModel,
    backend,
    stop: JSON.parse(stop) as string[],
    logit_bias: JSON.parse(logit_bias) as Record<string, number>,
    transforms: backend === 'openRouter' ? (JSON.parse(transforms) as string[]) : undefined,
    top_k: backend === 'openRouter' ? top_k : undefined,
  }

  return model
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

export async function getMessagesTag(message: Message[], key: string) {
  const tag = await prisma.tag.findMany({
    where: {
      messageID: { in: message.map((m) => m.id) },
      key,
    },
  })

  return tag
}

export async function getChatHistory(profile: Profile, msg: Message) {
  const chatHistory = await prisma.tag.findMany({
    select: {
      message: {
        select: {
          nick: true,
          content: true,
        },
      },
      value: true,
    },
    where: {
      key: profile.id,
      message: {
        server: msg.server,
        target: msg.target,
        self: false,
      },
    },
    take: -profile.maxHistorySize,
  })

  return chatHistory
}

export async function getOptions() {
  return await prisma.options.findFirstOrThrow({ where: { options: 'options' } })
}

export async function getWordList() {
  return await prisma.wordList.findMany({})
}

type ProfileMessage = {
  profile: Profile
  message: Message
}

export async function getProfileAndContextMessages(pMsg: ProfileMessage) {
  const { message, profile } = pMsg
  const { server, target } = message

  const { maxHistorySize: minProfile, numIncludeContextual: maxContextual } = profile
  const max = minProfile + maxContextual

  const tagProfileMsgs = await getProfileMessages(pMsg, max)
  // get any recent messages that aren't part of another profile
  const contextualMsgs = (
    await prisma.message.findMany({
      where: {
        server,
        target,
        tag: {
          none: {},
        },
      },
      take: -maxContextual,
    })
  )
    // remove any that are already included in profile messages
    .filter((m) => !tagProfileMsgs.some((p) => p.id === m.id))

  // combine list, sort into id order, remove any from the front that put us over the max
  const msgs = [...tagProfileMsgs, ...contextualMsgs].sort((a, b) => a.id - b.id).slice(-max)

  return [...msgs, message] // add current message to the end
}

// ? getRecentRelatedTaggedMessages
export async function getProfileMessages(pMsg: ProfileMessage, amount: number) {
  const { profile, message } = pMsg
  const { server, target } = message
  const { id: key } = profile

  return await prisma.message.findMany({
    where: {
      id: { not: message.id }, // exclude current message
      server,
      target,
      tag: {
        some: {
          key,
        },
      },
    },
    take: -amount,
  })
}

export async function getMessages(pMsg: ProfileMessage, amount: number) {
  const { message } = pMsg
  const { server, target } = message

  const msgs = await prisma.message.findMany({
    where: {
      server,
      target,
      self: false,
    },

    take: -amount,
  })

  return msgs
}
