import { createTag, prisma, type Message, type Profile } from '../../db.js'
import { command, dbug } from '../../index.js'
import { openAI } from './openAI.js'
import { constructProfilePrompt } from './prompt.js'

const log = dbug('chat')

export async function chat(msg: Message, profile: Profile | null) {
  log('start: %m', msg)

  // TODO replace mod check
  // const moderatedMsg = await moderate(msg)
  // if (!moderatedMsg || !moderatedMsg.allowed) return

  if (!profile) return log('aborted - invalid profile')

  const chatHistory = await prisma.tag.findMany({
    select: {
      message: {
        select: {
          nick: true,
          content: true,
        },
      },
      value: true,
    },
    where: {
      key: profile.id,
      message: {
        server: msg.server,
        target: msg.target,
        self: false,
      },
    },
    take: -profile.maxHistorySize,
  })

  const conversation = constructProfilePrompt(profile, chatHistory, msg)
  log('built prompt %O', conversation)

  const result = await openAI.chat(conversation, profile.maxTokens)
  if (!result) return log('chat failed')

  log(
    '%s {%s %d/%d/%d}',
    result.message,
    result.finishReason,
    result.usage?.prompt_tokens,
    result.usage?.completion_tokens,
    result.usage?.total_tokens,
  )

  command.say(msg.target, result.message)

  createTag(msg, profile.id, result.message)
}
