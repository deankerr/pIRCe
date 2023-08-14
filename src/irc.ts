import { ChildProcess, fork } from 'node:child_process'
import { IrcClient } from '@ctrl/irc'
import debug from 'debug'

import type { CommandMessage, IRCConfig } from './types.js'

const log = debug('pIRCe:server')

// add the bot, reloading mechanism and some missing irc commands
export class IRCClient extends IrcClient {
  bot: ChildProcess
  modulePath: string
  reloadKeyword: string

  constructor(config: IRCConfig, modulePath: string, reloadKeyword: string) {
    const { host, nick, nickservPassword, ...options } = config
    super(host, nick, options)

    this.modulePath = modulePath + '/index.js'
    this.reloadKeyword = reloadKeyword

    this.on('registered', () => {
      log('[Connected]')
      if (nickservPassword) {
        this.say('nickserv', 'identify ' + nickservPassword)
      }
    })

    // create bot, add listeners
    this.bot = fork(this.modulePath, [host, nick])
    this.initializeBot()

    // add irc events to foward to bot
    this.on('message', (nick, to, text, message) => {
      if (text === reloadKeyword) {
        this.reloadBot()
      } else {
        const packet = {
          target: to,
          nick,
          text: text.trim(),
          type: 'message',
          user: message.user,
          host: message.host,
          server: this.opt.host,
        }
        this.bot.send(packet)
      }
    })

    this.on('action', (from, to, text, message) => {
      const packet = {
        target: to,
        nick: from,
        text: text.trim(),
        type: 'action',
        user: message.user,
        host: message.host,
        server: this.opt.host,
      }
      this.bot.send(packet)
    })
  }

  reloadBot() {
    this.bot.kill()
    this.bot = fork(this.modulePath, [this.opt.host, this.nick])
    this.initializeBot()
  }

  initializeBot() {
    this.bot.on('error', (error) => log('bot error:', error))
    this.bot.on('exit', () => log('bot has terminated'))
    this.bot.on('message', (message: CommandMessage) => {
      if (message.join) this.join(message.join)
      if (message.part) this.part(message.part)
      if (message.quit) this.quit()
      if (message.say) this.say(message.say[0], message.say[1])
      if (message.action) this.action(message.action[0], message.action[1])
      if (message.info) this.info()
    })
  }

  part(channel: string) {
    this.send('PART', channel)
  }

  quit() {
    this.end()
    process.exit(0)
  }

  action(channel: string, text: string) {
    this.say(channel, '\u0001ACTION ' + text + '\u0001')
  }

  info() {
    log('nick:', this.nick)
    log('hostmask:', this.hostMask)
    log('chans:', this.chans)
    log('opt:', this.opt)
  }
}
