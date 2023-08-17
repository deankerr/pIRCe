import { getAIProfile, type Message } from '../../db.js'
import { command, dbug } from '../../index.js'
import { openAI } from './openAI.js'

const log = dbug('chat')
const outputConvoLog = false
// TODO uniform interface for routes, ie name, params

export async function chat(msg: Message, aiProfileID: number, matcher: RegExp) {
  log('start: %m', msg)

  // TODO replace mod check
  // const moderatedMsg = await moderate(msg)
  // if (!moderatedMsg || !moderatedMsg.allowed) return

  const profile = await getAIProfile(aiProfileID) // TODO move responsibility to router
  //// const system = { role: 'system', content: profile.prompt } as const
  // TODO big refactor needed for new prompt system
  const { content } = profile.promptItem
  const system = { role: 'system' as const, content }

  // const history = await getChatHistory(msg.target, profile.memoryLength)

  const user = {
    role: 'user',
    name: msg.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
    content: stripMatcher(msg.content, matcher), //? handle better - remember matcher used?
  } as const

  // const conversation = [system, ...history, user]
  const conversation = [system, user]

  if (outputConvoLog) conversation.forEach((m) => log('%m', m))
  else log('%m %m', system, user)

  const result = await openAI.chat(conversation, profile.maxTokens)
  if (!result) return log('chat failed')

  log(
    '%m {%s %d/%d/%d}',
    result.message,
    result.finishReason,
    result.usage?.prompt_tokens,
    result.usage?.completion_tokens,
    result.usage?.total_tokens,
  )

  //// const response = { role: 'assistant', content: result.message } as const
  //// addChatHistory(context.server, msg.target, user, response)

  command.say(msg.target, result.message)
}

function stripMatcher(text: string, matcher: RegExp) {
  return text.replace(matcher, '')
}
