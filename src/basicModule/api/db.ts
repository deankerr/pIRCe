import { PrismaClient, type Message as _Message, type Profile as _Profile } from '@prisma/client'

import { EventMessage } from '../../types.js'

export type { Message, Profile, Route } from '@prisma/client'

export const prisma = new PrismaClient()

export async function getRoutesForTarget(server: string, target: string) {
  const targetList = [target, '*', target.startsWith('#') ? '#' : '?']

  const routes = await prisma.route.findMany({
    where: { server: { in: [server, '*'] }, target: { in: targetList } },
    include: { profile: true },
  })
  return routes
}

export async function getAllRoutes() {
  return await prisma.route.findMany()
}

export async function createMessage(ircMessage: EventMessage) {
  const msg = await prisma.message.create({
    data: { ...ircMessage, content: ircMessage.content.trim() },
  })
  return msg
}

export async function createTag(message: _Message, key: string, value?: string) {
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

export async function getMessageTag(message: _Message, key: string) {
  const tag = await prisma.tag.findFirst({
    where: {
      messageID: message.id,
      key,
    },
  })

  return tag
}

export async function getChatHistory(profile: _Profile, msg: _Message) {
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
  profile: _Profile
  message: _Message
}

export async function getProfileAndContextMessages(pMsg: ProfileMessage) {
  const { message, profile } = pMsg
  const { server, target } = message

  const { maxHistorySize: minProfile, numIncludeContextual: maxContextual } = profile
  const max = minProfile + maxContextual

  const pMsgs = await getProfileMessages(pMsg, max)
  // get any recent messages that aren't part of another profile
  const rMsgs = (
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
    .filter((m) => !pMsgs.some((p) => p.id === m.id))

  // combine list, sort into id order, remove any from the front that put us over the max
  const msgs = [...pMsgs, ...rMsgs].sort((a, b) => a.id - b.id).slice(-max)

  return msgs
}

export async function getProfileMessages(pMsg: ProfileMessage, amount: number) {
  const { profile, message } = pMsg
  const { server, target } = message
  const { id: key } = profile

  return await prisma.message.findMany({
    where: {
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

export async function getChatModel(id: string) {
  const model = await prisma.chatModel.findUniqueOrThrow({ where: { id } })
  const { stop, logit_bias, transforms } = model
  return {
    ...model,
    stop: JSON.parse(stop) as string[],
    logit_bias: JSON.parse(logit_bias) as Record<string, number>,
    transforms: JSON.parse(transforms) as string[],
  }
}
