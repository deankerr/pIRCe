import { ai } from '../api/ai_next.js'
import { createTag, getProfileAndContextMessages, type Message, type Profile } from '../api/db.js'
import { llmTestReq } from '../api/llm.js'
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
  // await createTag(msg, profile.id)
  log('TODO: createTag')

  // const history = await getProfileAndContextMessages({ profile, message: msg })

  // for (const h of history) {
  //   log('%m', h)
  // }
  const conversation = buildMessages(profile, [msg])
  const result = await ai.chat('openai.gpt-3.5-turbo', conversation)
  if (result instanceof Error) return log('chat failed') // TODO Error messages response
  log('%s {%s}', result.message, result.finish_reason)

  const target = redirectOutput ? redirectOutput : msg.target
  command.say(target, result.message.content || '', null)
}
