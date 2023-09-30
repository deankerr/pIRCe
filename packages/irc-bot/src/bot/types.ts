import type { Handler, Message, Model, Platform, Profile } from '@prisma/client'
import type { getOptions } from './lib/db.js'

export type Options = Awaited<ReturnType<typeof getOptions>>

export type IRCEventMessage = {
  server: string
  target: string
  nick: string
  content: string
  type: string
  self: boolean
  mask: string
}

export type InitialContext = {
  message: Message
  options: Options
  self: Self
  handler: Handler
}

export type ActionContext = {
  message: Message
  options: Options
  self: Self
  handler: Handler
  profile: Profile
  model: Model
  platform: Platform
}

type Self = {
  server: string
  nick: string
}

export type AIChatMessage = {
  role: 'user' | 'assistant' | 'system'
  name?: string
  content: string
}
