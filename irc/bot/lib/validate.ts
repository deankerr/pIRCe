import type { ActionContext, InitialContext } from '../types'
import { z } from 'zod'

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

// JSON schema
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)

export const stringToJSONSchema = z.string().transform((str, ctx): z.infer<typeof jsonSchema> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(str)
  } catch (e) {
    ctx.addIssue({ code: 'custom', message: 'Invalid JSON' })
    return z.NEVER
  }
})

export function parseJsonList(str: string) {
  const json = stringToJSONSchema.parse(str)
  return z.string().array().parse(json)
}
