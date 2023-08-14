import { addChatHistory, getChatHistory, getSystemProfileByID, type Message } from '../../db.js'
import { command, dbug } from '../../index.js'
import { moderate } from './moderate.js'
import { openAI } from './openAI.js'

const log = dbug('chat')
const outputConvoLog = false
// TODO uniform interface for routes, ie name, params

export async function chat(msg: Message, profileID: number) {
  log('start: %m', msg)

  const moderatedMsg = await moderate(msg)

  if (!moderatedMsg || !moderatedMsg.allowed) return

  const profile = await getSystemProfileByID(profileID)
  const system = { role: 'system', content: profile.prompt } as const

  //? wipe history, store per profile?
  const history = await getChatHistory(msg.target, profile.memoryLength)

  const user = {
    role: 'user',
    name: msg.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
    content: msg.text,
  } as const

  const conversation = [system, ...history, user]

  if (outputConvoLog) conversation.forEach((m) => log('%m', m))
  else log('%m %m', system, user)

  const result = await openAI.chat(conversation, profile.maxTokens)
  if (!result) return log('chat failed')

  log(
    '>%m {%s %d/%d/%d}',
    result.message,
    result.finishReason,
    result.usage?.prompt_tokens,
    result.usage?.completion_tokens,
    result.usage?.total_tokens,
  )

  const response = { role: 'assistant', content: result.message } as const
  addChatHistory(msg.target, user, response)

  command.say(msg.target, result.message)
}
