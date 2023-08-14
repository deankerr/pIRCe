import type { IrcOptions } from '@ctrl/irc'

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
  text: string
  type: 'message' | 'action'

  user?: string
  host?: string
  server: string
}

export type IRCConfig = Partial<IrcOptions> &
  Pick<IrcOptions, 'host' | 'nick'> & { nickservPassword?: string }

export type BasicModuleOptions = {
  allowedModerationCategories: string[]
  adminKeyword: string
  outputWordFilterList: string[]
}
