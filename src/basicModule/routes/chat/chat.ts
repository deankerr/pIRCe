import { addChatHistory, getChatHistory, type Message } from '../../db.js'
import { command, context, dbug } from '../../index.js'
import { moderate } from './moderate.js'
import { openAI } from './openAI.js'

const log = dbug('chat')

export async function chat(msg: Message) {
  const { options } = context
  log('start: %m', msg)

  const moderatedMsg = await moderate(msg)

  if (!moderatedMsg || !moderatedMsg.allowed) return

  // const profile =

  const history = await getChatHistory(msg.target, options.chatMemoryLength)

  const system = { role: 'system', content: options.chatSystemPrompt } as const
  const user = {
    role: 'user',
    name: msg.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
    content: msg.text,
  } as const

  const conversation = [system, ...history, user]
  // conversation.forEach((m) => log('%m', m))

  const result = await openAI.chat(conversation, options.chatMaxTokens)
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
