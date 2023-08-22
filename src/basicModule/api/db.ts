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
