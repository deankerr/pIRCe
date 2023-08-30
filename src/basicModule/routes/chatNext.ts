import { ai } from '../api/ai_next.js'
import { createTag, getProfileAndContextMessages, type BotEvent } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'
import { buildMessages } from './prompt.js'

const log = logger.create('chatNext')

export async function chatNext(botEvent: BotEvent) {
  const { profile, message, route, chatModel } = botEvent
  if (!profile) return log('aborted - missing profile')
  if (!chatModel) return log('aborted - missing chat model')

  await createTag(message, profile.id) // ? probs move

  const history = await getProfileAndContextMessages({ profile, message })

  const conversation = buildMessages(profile, history)

  log('%m', conversation[0])
  log('%m', message)

  // const result = await ai.chat('openai.gpt-3.5-turbo', conversation)
  const result = await ai.chat(chatModel, conversation)

  if (result instanceof Error) return log('chat failed')

  log('%m {%s}', result.message.content, result.finish_reason)

  const target = route.redirectOutput ? route.redirectOutput : message.target
  command.say(target, result.message.content || '', null)
}
