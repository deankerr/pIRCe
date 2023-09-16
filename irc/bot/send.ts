import type { ActionContext, InitialContext } from './types.js'
import { createConversationTags, createMessage } from './lib/db.js'
import { format } from './lib/output.js'

const sendDataToHost = (data: string) => {
  if (!process.send) throw new Error('process.send is unavailable')
  process.send(data)
}

export const sendRaw = {
  join: (target: string) => {
    sendDataToHost(`join ${target}`)
  },

  part: (target: string) => {
    sendDataToHost(`part ${target}`)
  },

  say: (target: string, message: string) => {
    sendDataToHost(`say ${target} ${message}`)
  },

  action: (target: string, message: string) => {
    sendDataToHost(`action ${target} ${message}`)
  },
}

type AnyContext = InitialContext | ActionContext
export const respond = {
  say: (ctx: AnyContext, message: string) => createResponse(ctx, 'say', message),
  action: (ctx: AnyContext, message: string) => createResponse(ctx, 'action', message),
}

async function createResponse(
  ctx: InitialContext | ActionContext,
  type: 'say' | 'action',
  content: string,
) {
  const target = ctx.handler.overrideOutputTarget ?? ctx.message.target

  const formatted = await format(content, ctx.options)
  sendRaw[type](target, formatted)

  const ourMessage = await createMessage({
    server: ctx.self.server,
    target,
    nick: ctx.self.nick,
    content,
    self: true,
    mask: 'self',
    type,
  })

  if ('profile' in ctx) createConversationTags(ctx.profile, ctx.message, ourMessage)
}
