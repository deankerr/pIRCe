import { ai } from '../api.js'
import { createTag, getChatHistory, type Message, type Profile } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'
import { constructProfilePrompt } from './prompt.js'

const log = logger.create('chatLlama')

export async function chatLlama(
  msg: Message,
  profile: Profile | null,
  redirectOutput?: string | null,
) {
  if (!profile) return log('aborted - invalid profile')

  const chatHistory = await getChatHistory(profile, msg)
  const conversation = constructProfilePrompt(profile, chatHistory, msg)

  // log('%m', conversation.at(-2))

  const result = await ai.testORLlamaChat(conversation, 128)
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

  createTag(msg, profile.id, result.message)
}
