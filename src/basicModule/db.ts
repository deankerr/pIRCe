import { PrismaClient, type Message as _Message } from '@prisma/client'

import { EventMessage } from '../types.js'

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

export async function getOptions() {
  return await prisma.options.findFirstOrThrow({ where: { options: 'options' } })
}
