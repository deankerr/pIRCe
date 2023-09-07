import type { ActionContext, InitialContext, IRCEventMessage } from './types.js'
import debug from 'debug'
import { createMessage, getHandlers, getOptions } from './api/db.js'
import { respond } from './command.js'
import { TRIGGER_TYPE, WILDCARD } from './const.js'
import { admin } from './features/admin.js'
import { chat } from './features/chat/chat.js'
import { image } from './features/image.js'
import { self } from './lib/util.js'

type SimpleFeature = (ctx: InitialContext) => void | Promise<void>
type ActionFeature = (ctx: ActionContext) => void | Promise<void>

const simpleFeatures: Record<string, SimpleFeature> = {
  admin,
}
const actionFeatures: Record<string, ActionFeature> = {
  chat,
  image,
}

const log = debug('pIRCe')

export async function main(ircMessage: IRCEventMessage) {
  const message = await createMessage(ircMessage)
  if (message.self) return // don't route our own messages

  // find all matching handlers
  const allHandlers = await getHandlers()

  const matched = allHandlers.filter((handler) => {
    // skip missing feature / trigger word
    if (handler.feature === null || handler.triggerWord === null) return false

    // apply server/channel name restrictions
    if (handler.restrictServer && message.server !== handler.restrictServer) return false
    if (handler.restrictTarget && message.target !== handler.restrictTarget) return false

    // apply channel/query only filters
    const isChannel = message.target.startsWith('#')
    if (isChannel && !handler.allowChannel) return false
    if (!isChannel && !handler.allowQuery) return false

    // TODO check admin status

    // trigger on anything is now true
    if (handler.triggerType === TRIGGER_TYPE.anything) return true

    // apply nick wildcard
    const triggerWord = handler.triggerWord.replaceAll(WILDCARD.nick, self.nick)

    // command-style trigger, e.g. $chat |  $chat (allow whitespace)
    if (handler.triggerType === TRIGGER_TYPE.command) {
      const command = new RegExp(`^\\s*${triggerWord} `)
      if (command.test(message.content)) return true
    }

    // trigger word reasonably mentioned, e.g. word | word, | word: | word!
    if (handler.triggerType === TRIGGER_TYPE.mention) {
      const mention = new RegExp(`(^|\\s)${triggerWord}([.,!?:;\\s]|$)`)
      if (mention.test(message.content)) return true
    }

    // no match
    return false
  })

  for (const handler of matched) {
    if (!handler.feature) return
    // const { handler, profile, model, platform } = match
    // if (handler.feature === null) continue // should already be filtered?

    const simple = simpleFeatures[handler.feature]
    if (simple) {
      const context = {
        message,
        options: await getOptions(),
        self,
        handler,
        respond,
      }

      await simple(context)
      return
    }

    const action = actionFeatures[handler.feature]

    if (action && handler.profile && handler.profile.model) {
      const context = {
        message,
        options: await getOptions(),
        self,
        handler,
        respond,
        profile: handler.profile,
        model: handler.profile.model,
        platform: handler.profile.model.platform,
      }

      await action(context)
    }
  }
}

process.on('message', (message: IRCEventMessage) => void main(message))
log(`bot loaded! 🤖🤖`)
