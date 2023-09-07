import type { Message } from '@prisma/client'
import type { ActionContext, AIChatMessage, Options } from '../../types.js'
import debug from 'debug'
import { getContextualMessages } from '../../api/db.js'
import { buildOpenChatMessages, normalizeAPIInput } from '../../lib/input.js'
import { TEMPparseProfileParameters } from '../../lib/validate.js'
import { apiChat, apiModerateMessages } from './api.js'

const log = debug('pIRCe:chat')

export async function chat(ctx: ActionContext) {
  try {
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
      ...TEMPparseProfileParameters(profile.parameters),
      messages,
      model: model.id,
    }

    const result = await apiChat(platform, parameters, options)

    if (!result || result instanceof Error) return log('chat failed')

    // OR.hermes leaks hallucinated response
    const response = result.message.content.replaceAll(/<(human|bot).*$/gm, '').trim()

    log('%s {%s}', response, result.finish_reason)

    const { respond } = ctx
    await respond.say(ctx, response) //^ this is a bit silly
  } catch (error) {
    log(error)
  }
}

async function moderateMessages(messages: AIChatMessage[], userMessage: Message, options: Options) {
  const modResults = await apiModerateMessages(messages, options)
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

  return abort ? null : messages
}
