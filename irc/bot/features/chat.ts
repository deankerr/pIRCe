import type { Message } from '@prisma/client'
import type { AIChatMessage, HandlerEvent, Options } from '../types.js'
import debug from 'debug'
import { ai } from '../api/ai.js'
import { createTag, getContextualMessages } from '../api/db.js'
import { command } from '../command.js'
import { buildOpenChatMessages, normalizeAPIInput } from '../util/input.js'

const log = debug('pIRCe:chat')

export async function chat(event: HandlerEvent) {
  try {
    // TODO Validate all the null profile values
    const { message, options, handler } = event
    const { profile } = handler
    if (profile === null) throw new Error('chat: profile is null')
    const { model } = profile
    if (model === null) throw new Error('chat: model is null')

    const contextual = await getContextualMessages(message, profile)
    let messages = buildOpenChatMessages(profile, contextual)

    if (model.platformID === 'openai') {
      const moderated = await moderateMessages(messages, message, options)
      if (!moderated) return log('chat failed')
      messages = moderated
    }

    messages = normalizeAPIInput(messages, handler.triggerWord)
    log('%O', messages)

    // * Construct payload
    const parameters = JSON.parse(profile.parameters) as Record<string, string>

    const payload = {
      ...parameters,
      messages,
      model: model.id,
    }

    const result = await ai.chat(model.platform, payload, options)

    if (!result || result instanceof Error) return log('chat failed')

    // OR.hermes leaks hallucinated response
    const response = result.message.content.replaceAll(/<(human|bot).*$/gm, '').trim()

    log('%s {%s}', response, result.finish_reason ?? '?')

    // TODO proper tag system
    const tempProfileIDTag = `${profile.id}+${profile.version}`

    await createTag(message, tempProfileIDTag)
    const target = handler.overrideOutputTarget ?? message.target
    void command.say(target, response, tempProfileIDTag)
  } catch (error) {
    log(error)
  }
}

async function moderateMessages(messages: AIChatMessage[], userMessage: Message, options: Options) {
  const modResults = await ai.moderateMessages(messages, options)
  if (modResults instanceof Error) throw modResults

  let abort = false
  messages.filter((msg, i) => {
    const result = modResults[i]
    if (!result) throw new Error('Invalid moderation result')

    const allowed = result.length === 0

    if (!allowed && msg.role === 'system') {
      log('Moderation failed on system prompt: %o', msg.content)
      abort = true
    }

    if (!allowed && msg.content === userMessage.content) {
      log('Moderation failed: %o', msg.content)
      abort = true
    }

    return allowed
  })
  log(messages, abort)
  return abort ? null : messages
}

// function createChatEvent(botEvent: BotEvent): ChatEvent {
//   if ('profile' in botEvent.route && 'model' in botEvent.route) {
//     const profile = botEvent.route.profile as Profile
//     const model = botEvent.route.model as Model
//     return { ...botEvent, profile, model }
//   } else {
//     throw new Error('BotEvent missing profile/model')
//   }
// }
