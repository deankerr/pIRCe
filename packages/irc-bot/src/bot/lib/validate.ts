import { z } from 'zod'

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

export function parseJsonRecord(data: unknown) {
  const json = stringToJSONSchema.parse(data)
  return z.object({}).passthrough().parse(json)
}
