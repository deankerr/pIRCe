import { command } from '../command.js'
import { addChatHistory, getChatHistory, getOptions, type Message } from '../db.js'
import { logger } from '../logger.js'
import { moderate } from './moderate.js'
import { openAI } from './openAI.js'

const log = logger.extend('chat')

export async function chat(msg: Message) {
  // TODO context
  const options = await getOptions()
  const IRC_NICK = process.argv[3]
  const chatTrigger = new RegExp(`^\\s*${IRC_NICK}[^\\w]`, 'i')

  if (!chatTrigger.test(msg.text)) return

  log('chat: %s: %s', msg.nick, msg.text)

  const moderatedMsg = await moderate(msg)

  if (!moderatedMsg || !moderatedMsg.allowed) return

  const history = await getChatHistory(msg.target, options.chatMemoryLength)

  const system = { role: 'system', content: options.chatSystemPrompt } as const
  const user = {
    role: 'user',
    name: msg.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
    content: msg.text,
  } as const

  const conversation = [system, ...history, user]
  log('conversation: %O', conversation)

  const result = await openAI.chat(conversation, options.chatMaxTokens)
  if (!result) return log('chat failed')

  log(
    '< %s {%s %d/%d/%d}',
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
