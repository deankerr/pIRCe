import type { IRCConfig } from '../src/types.js'

export const irc: IRCConfig = {
  host: 'irc.server.addr',
  port: 6667,

  nick: 'pIRCebot',
  userName: 'pIRCebot',
  realName: 'pIRCe T. Bot',

  channels: ['#robotschat', '#robotsdev'],

  nickservPassword: '',
}

export const module = {
  reloadKeyword: '!!reload!!',
}
