import { ai } from '../api.js'
import { createTag, getProfileAndContextMessages, type Message, type Profile } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'
import { buildMessages } from './prompt.js'

const log = logger.create('chatLlama')

export async function chatLlama(
  msg: Message,
  profile: Profile | null,
  redirectOutput?: string | null,
) {
  if (!profile) return log('aborted - invalid profile')
  await createTag(msg, profile.id)

  const history = await getProfileAndContextMessages({ profile, message: msg })

  for (const h of history) {
    log('%m', h)
  }
  const conversation = buildMessages(profile, history)

  const result = await ai.chatLlama(conversation, profile.maxTokens, 'gryphe/mythomax-L2-13b')
  if (!result) return log('chat failed')

  log('%s', result)

  const target = redirectOutput ? redirectOutput : msg.target

  if (result.error) {
    command.say(target, result.error, null)
  } else if (result.message) {
    command.say(target, result.message, profile.id)
  }
}
