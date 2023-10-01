import type { Message } from 'matrix-org-irc'
import { Client } from 'matrix-org-irc'
import { main } from './bot/main'

function getConfig() {
  const config = {
    server: env('IRC_SERVER'),
    nick: env('IRC_NICK'),
    opts: {
      userName: env('IRC_USERNAME', 'pIRCeBot'),
      realName: env('IRC_REALNAME', 'pIRCe T. Bot'),
      channels: envList('IRC_CHANNELS', ['']),
      debug: false,
      floodProtection: true,
    },
    nickservPW: env('IRC_NICKSERV_PW', ''),
  }

  return config
}

function env(key: string, fallback?: string) {
  const value = process.env[key] ?? fallback
  if (value === undefined) throw new Error('Required variable not set: ' + key)
  return value
}

function envList(key: string, fallback?: string[]) {
  const value = process.env[key] ?? fallback
  if (typeof value === 'string') return value.split(' ')
  else return value
}

function createIRCClient() {
  const { server, nick, opts, nickservPW } = config
  const irc = new Client(server, nick, opts)

  irc.on('error', (err) => console.log('error: %o', err))
  irc.on('netError', (err) => console.log('netError: %o', err))
  irc.on('registered', () => {
    console.log('[connected]')
    if (nickservPW) void irc.say('nickserv', `identify ${nickservPW}`)
  })

  console.log('irc client created')
  return irc
}

function handleMessage(from: string, to: string, text: string, message: Message) {
  const msg = {
    server: config.server,
    target: to,
    nick: from,
    content: text,
    type: 'message',
    self: false,
    mask: `${message.user}@${message.host}`,
  }
  main(msg).catch((error) => {
    console.log('bot error: %O', error)
  })
}

const config = getConfig()
console.log(`irc options: %O`, config)

declare global {
  // eslint-disable-next-line no-var
  var irc: Client
}

globalThis.irc ??= createIRCClient()
export const irc = globalThis.irc

if (irc.listenerCount('message') === 0) {
  irc.on('message', handleMessage)
} else {
  irc.removeAllListeners('message')
  irc.on('message', handleMessage)
}
