import { getAIProfile, prisma, type Message } from '../../db.js'
import { command, dbug } from '../../index.js'
import { openAI } from './openAI.js'
import { buildPromptMessages } from './prompt.js'

const log = dbug('chat')
// const outputConvoLog = false
// TODO uniform interface for routes, ie name, params

export async function chat(msg: Message, aiProfileID: number, matcher: RegExp) {
  log('start: %m', msg)

  // TODO replace mod check
  // const moderatedMsg = await moderate(msg)
  // if (!moderatedMsg || !moderatedMsg.allowed) return

  const profile = await getAIProfile(aiProfileID) // TODO move responsibility to router

  //! could result in wrong message being last if multiple sent at once
  const userM = await prisma.message.findMany({
    where: { target: msg.target },
    take: -profile.maxHistorySize,
    select: { nick: true, content: true, self: true },
  })

  const convo = buildPromptMessages(profile.prompt, userM)
  log('built prompt %O', convo)

  const result = await openAI.chat(convo, profile.maxTokens)
  if (!result) return log('chat failed')

  log(
    '%s {%s %d/%d/%d}',
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
