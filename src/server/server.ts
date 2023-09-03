import { config } from '@creditkarma/dynamic-config'

import 'dotenv/config'

import chokidar from 'chokidar'
import debug from 'debug'

import { IRCConfig } from '../types.js'
import { IRCClient } from './irc.js'

export const log = debug('pIRCe:server')

const ircConfig = await config().get<IRCConfig>('irc')
const moduleInfo = await config().get<Record<string, string>>('module')
const modulePath = 'src/bot/index.js'

log('NODE_ENV: %s', process.env.NODE_ENV)
log(`server: %s nick: %s`, ircConfig.host, ircConfig.nick)
log('reload keyword: %s', moduleInfo.reloadKeyword)

// set up irc client
const irc = new IRCClient(ircConfig, modulePath, moduleInfo.reloadKeyword)

// add some feedback messages
irc.on('error', (err) => log('error: %o', err))
irc.on('netError', (err) => log('error: %o', err))

irc.connect()

// module file watcher
function watchReload() {
  log('[module changed, reloading]')
  irc.reloadBot()
}

const watch = chokidar.watch(modulePath, { ignoreInitial: true })
watch.on('add', watchReload)
watch.on('change', watchReload)

const ircRaw = debug('pIRCe:irc')
irc.on('raw', (message) => {
  if (['PING', 'PONG', 'rpl_'].some((c) => message.command.startsWith(c))) return
  const data = message.nick ? [message.nick, ...message.args] : message.args
  ircRaw('%s: %s', message.command, data.join('/'))
})