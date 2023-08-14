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
  outputWordFilterList: ['badword'],
}
