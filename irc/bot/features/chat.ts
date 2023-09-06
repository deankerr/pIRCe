import type { Message } from '@prisma/client'
import type { AIChatMessage, InitialContext, Options } from '../types.js'
import debug from 'debug'
import { ai } from '../api/ai.js'
import { createConversationTag, getContextualMessages } from '../api/db.js'
import { command } from '../command.js'
import { buildOpenChatMessages, normalizeAPIInput } from '../lib/input.js'
import { validateActionContext } from '../lib/validate.js'

const log = debug('pIRCe:chat')

export async function chat(event: InitialContext) {
  try {
    const ctx = validateActionContext(event)
    if (ctx instanceof Error) return log('failed')

    const { message, options, handler, profile, model, platform } = ctx

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
    const parameters = {
      ...profile.parameters,
      messages,
      model: model.id,
    }

    const result = await ai.chat(platform, parameters, options)

    if (!result || result instanceof Error) return log('chat failed')

    // OR.hermes leaks hallucinated response
    const response = result.message.content.replaceAll(/<(human|bot).*$/gm, '').trim()

    log('%s {%s}', response, result.finish_reason ?? '?')

    const target = handler.overrideOutputTarget ?? message.target
    await createConversationTag(profile, message)
    const responseMessage = await command.say(target, response)
    await createConversationTag(profile, responseMessage)
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
