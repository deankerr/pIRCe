import { config } from '@creditkarma/dynamic-config'
import { PrismaClient } from '@prisma/client'

import { BasicModuleOptions, EventMessage } from '../types.js'
import type { OAIChatMessages } from './chat/openAI.js'
import { logger } from './logger.js'

export type { Message } from '@prisma/client'

export const prisma = new PrismaClient()

const log = logger.extend('db')

export async function createMessage(ircMessage: EventMessage) {
  const msg = await prisma.message.create({
    data: ircMessage,
  })

  return msg
}

export async function addChatHistory(target: string, ...items: OAIChatMessages) {
  for (const item of items) {
    await prisma.basicModuleChatHistory.create({
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
  const raw = await prisma.basicModuleChatHistory.findMany({
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

// TODO ensure only runs once
let optionsInitialized = false
export async function initializeOptions() {
  log('init options')
  const defaultOptions = await config().get<BasicModuleOptions>('basicModuleOptions')
  const currentOptions = await prisma.basicModuleOptions.findMany()

  const keys = Object.keys(defaultOptions) as (keyof typeof defaultOptions)[]

  for (const key of keys) {
    const dbOption = currentOptions.find((item) => item.key === key)

    // if not found, initialize with default value
    if (!dbOption) {
      const value = defaultOptions[key]
      log('adding default option [%s] => %O', key, value)
      await prisma.basicModuleOptions.create({ data: { key, value: JSON.stringify(value) } })
    }
  }

  optionsInitialized = true
}

export async function getOptions() {
  if (!optionsInitialized) await initializeOptions()
  const record = await prisma.basicModuleOptions.findMany()
  const options = record.reduce<BasicModuleOptions>((acc, cur) => {
    return { ...acc, [cur.key]: JSON.parse(cur.value) }
  }, {} as BasicModuleOptions)
  return options
}
