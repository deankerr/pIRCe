import type { ActionContext, InitialContext } from '../types'

export function validateActionContext(ctx: InitialContext): ActionContext | Error {
  const model = ctx.model !== null
  const platform = ctx.platform !== null
  const profile = ctx.profile !== null

  if (model && platform && profile) {
    return ctx as ActionContext
  } else {
    const label = `${ctx.handler.id}/${ctx.handler.triggerWord}/${ctx.profile?.label}/${ctx.model?.label}`
    throw new Error(`ActionContext validation failed: ${label}`)
  }
}
