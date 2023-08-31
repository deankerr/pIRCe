import { ai } from '../api/ai_next.js'
import { createTag, getContextualMessages, type BotEvent } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'

const log = logger.create('chatNext')

export async function chatNext(botEvent: BotEvent) {
  const { profile, message, route } = botEvent

  const contexual = await getContextualMessages(botEvent)

  log('%m', profile.prompt)
  log('%m', message)

  const result = await ai.chat(botEvent, contexual)

  if (!result || result instanceof Error) return log('chat failed')

  log('%m {%s}', result.message.content, result.finish_reason ?? '?')

  await createTag(message, profile.id)
  const target = route.redirectOutput ? route.redirectOutput : message.target
  command.say(target, result.message.content || '', profile.id)
}
