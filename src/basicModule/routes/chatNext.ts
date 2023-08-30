import { ai } from '../api/ai_next.js'
import { createTag, getProfileAndContextMessages, type Message, type Profile } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'
import { buildMessages } from './prompt.js'

const log = logger.create('chatNext')

export async function chatNext(
  msg: Message,
  profile: Profile | null,
  redirectOutput?: string | null,
) {
  if (!profile) return log('aborted - invalid profile')
  await createTag(msg, profile.id)

  const history = await getProfileAndContextMessages({ profile, message: msg })

  const conversation = buildMessages(profile, history)

  log('%m', conversation[0])
  log('%m', conversation[conversation.length - 2])
  log('%m', conversation[conversation.length - 1])

  const result = await ai.chat('openai.gpt-3.5-turbo', conversation)

  if (result instanceof Error) return log('chat failed')

  log('%m {%s}', result.message.content, result.finish_reason)

  const target = redirectOutput ? redirectOutput : msg.target
  command.say(target, result.message.content || '', null)
}
