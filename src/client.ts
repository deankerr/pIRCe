import debug from 'debug'
import { Client } from 'matrix-org-irc'
import { main } from './bot/main'

const log = debug('pIRCe:irc')
// const botPath = 'src/bot/'
// const botEntry = botPath + 'main.js'
// const autoReloadDelay = 5000

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
    reloadKeyword: env('BOT_RELOAD', '!!reload!!'),
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

  irc.on('error', (err) => log('error: %o', err))
  irc.on('netError', (err) => log('error: %o', err))
  irc.on('registered', () => {
    log('[connected]')
    if (nickservPW) void irc.say('nickserv', `identify ${nickservPW}`)
  })
  // irc.on('message', handleMessage)
  irc.on('message', (from, to, text, message) => {
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
      log('bot error: %O', error)
    })
  })

  return irc
}

// function createBot() {
//   const bot = fork(botEntry, [config.server, config.nick])
//   bot.on('error', (error) => {
//     log('bot error:', error)
//     setTimeout(reloadBot, autoReloadDelay)
//   })

//   bot.on('exit', () => {
//     log('bot has terminated')
//   })

//   bot.on('message', (message) => {
//     if (typeof message !== 'string') throw new Error('Unknown bot message type')

//     const [command, target, ...rest] = message.split(' ')
//     const text = rest.join(' ')
//     if (!target) return log('Invalid command')
//     if (command === 'join') void irc.join(target)
//     if (command === 'part') void irc.part(target, '')
//     if (command === 'say') void irc.say(target, text)
//     if (command === 'action') void irc.action(target, text)
//   })

//   return bot
// }

// function autoReload

// function reloadBot() {
//   bot.kill()
//   bot = createBot()
// }

// function handleMessage(nick: string, target: string, content: string, message: Message) {
//   if (content === config.reloadKeyword) return reloadBot()

//   bot.send({
//     server: config.server,
//     target,
//     nick,
//     content,
//     type: 'message',
//     self: false,
//     mask: `${message.user}@${message.host}`,
//   })
// }

const config = getConfig()
log(`irc options: %O`, config)

const irc = createIRCClient()
// let bot = createBot()
