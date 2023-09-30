import type { ActionContext, InitialContext } from './types.js'
import { irc } from '../client.js'
import { createConversationTags, createMessage } from './lib/db.js'
import { format } from './lib/output.js'

export const sendRaw = {
  join: async (target: string) => {
    await irc.join(target)
  },

  part: async (target: string) => {
    await irc.part(target, '')
  },

  say: async (target: string, message: string) => {
    await irc.say(target, message)
  },

  action: async (target: string, message: string) => {
    await irc.action(target, message)
  },
}

type AnyContext = InitialContext | ActionContext
export const respond = {
  say: (ctx: AnyContext, message: string) => createResponse(ctx, 'say', message),
  action: (ctx: AnyContext, message: string) => createResponse(ctx, 'action', message),
  error: (ctx: AnyContext, message: string) => createResponse(ctx, 'say', message, true),
}

async function createResponse(
  ctx: InitialContext | ActionContext,
  type: 'say' | 'action',
  content: string,
  error = false,
) {
  const target = ctx.handler.overrideOutputTarget ?? ctx.message.target

  const formatted = await format(content, ctx.options)
  await sendRaw[type](target, formatted)

  const ourMessage = await createMessage({
    server: ctx.self.server,
    target,
    nick: ctx.self.nick,
    content,
    self: true,
    mask: 'self',
    type,
  })

  if (!error && 'profile' in ctx) createConversationTags(ctx.profile, ctx.message, ourMessage)
}
