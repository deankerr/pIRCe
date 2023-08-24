import { ai } from '../api.js'
import { createTag, getProfileAndContextMessages, type Message, type Profile } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'
import { buildMessages } from './prompt.js'

const log = logger.create('chat+context')

export async function chatWithContext(
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

  const result = await ai.chat(conversation, profile.maxTokens)
  if (!result) return log('chat failed')

  log(
    '%s {%s %d/%d/%d}',
    result.message,
    result.finishReason,
    result.usage?.prompt_tokens,
    result.usage?.completion_tokens,
    result.usage?.total_tokens,
  )

  const target = redirectOutput ? redirectOutput : msg.target
  command.say(target, result.message, profile.id)
}
