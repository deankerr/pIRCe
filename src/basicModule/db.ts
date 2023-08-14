import { config } from '@creditkarma/dynamic-config'
import { PrismaClient } from '@prisma/client'

import { BasicModuleOptions, EventMessage } from '../types.js'
import type { OAIChatMessages } from './routes/chat/openAI.js'

export type { Message } from '@prisma/client'

export const prisma = new PrismaClient()

export async function getRoutesForTarget(server: string, target: string) {
  console.log('getroutes', server, target)
  const targetList = [target, '*', target.startsWith('#') ? '##' : '??']

  const routes = await prisma.routes.findMany({
    where: { server: { in: [server, '*'] }, target: { in: targetList } },
  })
  return routes
}

export async function getAllRoutes() {
  return await prisma.routes.findMany()
}

export async function getSystemProfileByID(id: number) {
  return await prisma.systemProfile.findUniqueOrThrow({ where: { id } })
}

export async function createMessage(ircMessage: EventMessage) {
  const msg = await prisma.message.create({
    data: ircMessage,
  })

  return msg
}

export async function addChatHistory(target: string, ...items: OAIChatMessages) {
  for (const item of items) {
    await prisma.chatHistory.create({
      data: {
        target: target,
        role: item.role,
        name: item.name,
        content: item.content || '',
      },
    })
  }
}

export async function getChatHistory(target: string, limit: number): Promise<OAIChatMessages> {
  const raw = await prisma.chatHistory.findMany({
    where: { target },
    select: { role: true, name: true, content: true },
    take: -limit,
  })

  // remove null names
  const history = raw.map((item) => {
    const { role, name, content } = item
    if (name === null) return { role, content }
    else return { role, name, content }
  })

  return history as OAIChatMessages
}

export async function initOptions() {
  const defaults = await config().get<BasicModuleOptions>('basicModuleOptions')
  const previous = await prisma.optionData.findMany()

  const options = { ...defaults }

  // merge stored option records with default
  for (const opt of previous) {
    const obj = { [opt.key]: JSON.parse(opt.value) }
    Object.assign(options, obj)
  }

  // store the result in the db
  for (const [key, value] of Object.entries(options)) {
    await prisma.optionData.upsert({
      where: { key },
      create: { key, value: JSON.stringify(value) },
      update: { value: JSON.stringify(value) },
    })
  }

  return options
}
