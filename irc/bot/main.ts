import type { FEATURE } from './const.js'
import type { InitialContext, IRCEventMessage } from './types.js'
import debug from 'debug'
import { createMessage, getHandlers, getOptions } from './api/db.js'
import { respond } from './command.js'
import { TRIGGER_TYPE, WILDCARD } from './const.js'
import { admin } from './features/admin.js'
import { chat } from './features/chat.js'
import { image } from './features/image.js'
import { self } from './lib/util.js'

type Feature = (ctx: InitialContext) => void | Promise<void>
const features: Record<string, Feature> = {
  admin,
  chat,
  image,
} satisfies Record<keyof typeof FEATURE, Feature>

const log = debug('pIRCe')

export async function main(ircMessage: IRCEventMessage) {
  const message = await createMessage(ircMessage)
  if (message.self) return // don't route our own messages

  // find all matching handlers
  const allHandlers = await getHandlers()
  const matched = allHandlers.filter(({ handler }) => {
    // require trigger word / feature
    if (handler.feature === null || handler.triggerWord === null) return false
    // filter target
    const targetType = message.target.startsWith('#') ? 'channel' : 'query'
    if (targetType === 'channel' && !handler.allowChannel) return false
    if (targetType === 'query' && !handler.allowQuery) return false
    if (handler.restrictServer && message.server !== handler.restrictServer) return false
    if (handler.restrictTarget && message.target !== handler.restrictTarget) return false
    // TODO check admin status

    if (handler.triggerType === TRIGGER_TYPE.anything) return true

    // evaluate wildcard in handler trigger
    const triggerWord = handler.triggerWord.replaceAll(WILDCARD.nick, self.nick)

    if (handler.triggerType === TRIGGER_TYPE.command) {
      // trigger at start of message, e.g. $chat |  $chat (with pre-whitespace)
      const command = new RegExp(`^\\s*${triggerWord} `)
      if (command.test(message.content)) return true
    } else if (handler.triggerType === TRIGGER_TYPE.mention) {
      // word reasonably mentioned, e.g. word | word, | word: | word!
      const mention = new RegExp(`(^|\\s)${triggerWord}([.,!?:;\\s]|$)`)
      if (mention.test(message.content)) return true
    }
    // no match
    return false
  })

  for (const match of matched) {
    const { handler, profile, model, platform } = match
    if (handler.feature === null) continue // should already be filtered?

    const feature = features[handler.feature]
    if (feature) {
      log(
        '%s / %s / %s / %s / %s',
        handler.triggerWord,
        handler.feature,
        profile?.label,
        model?.label,
        platform?.label,
      )
      const options = await getOptions()
      void feature({
        ...match,
        message,
        options,
        self,
        respond,
      })
    }
  }
}

process.on('message', (message: IRCEventMessage) => void main(message))
log(`bot loaded! 🤖🤖`)
