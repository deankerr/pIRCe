import type { BasicModuleOptions, IRCConfig } from '../src/types.js'

export const irc: IRCConfig = {
  host: 'irc.libera.chat',
  port: 6667,

  nick: 'pIRCebot',
  userName: 'pIRCebot',
  realName: 'pIRCe T. Bot',

  channels: ['#robotschat', '#robotsdev'],

  nickservPassword: '',
}

export const module = {
  name: 'basicModule',
  path: 'src/basicModule',
  reloadKeyword: '!!reload!!',
}

export const basicModuleOptions: BasicModuleOptions = {
  allowedModerationCategories: [''],
  adminKeyword: '!!admin!!',
  chatSystemPrompt: 'You are a robot. You respond with a short sentence.',
  chatMemoryLength: 10,
  chatMaxTokens: 40,
  outputWordFilterList: ['badword'],
}
