import type { IrcOptions } from '@ctrl/irc'
import type { ChatModel, ImageModel, Message, Options, Profile, Route } from '@prisma/client'

export type CommandMessage = {
  join?: string
  part?: string
  quit?: string
  say?: [string, string]
  action?: [string, string]
  info?: true
}

export type EventMessage = {
  target: string
  nick: string

  type: 'message' | 'action'
  content: string
  self: boolean

  mask: string
  server: string
}

export type IRCConfig = Partial<IrcOptions> &
  Pick<IrcOptions, 'host' | 'nick'> & { nickservPassword?: string }

// TODO rm
export type OpenAIMessage = {
  role: 'system' | 'assistant' | 'user'
  name?: string
  content: string
}
