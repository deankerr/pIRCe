import { z } from 'zod'

// platform const definitions / specific handlers / schemas
// OpenAI / OpenRouter
const chatMessagesSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant', 'system', 'function']),
    name: z.string().optional(),
    content: z.string(),
  }),
)

const allChatParametersSchema = z
  .object({
    model: z.string(),
    prompt: z.string(), // if this not messages
    messages: chatMessagesSchema, // if this not prompt
    // Common
    n: z.number(),
    max_tokens: z.number(),
    temperature: z.number(),
    top_p: z.number(),
    stop: z.array(z.string()), // ? or string
    presence_penalty: z.number(),
    frequency_penalty: z.number(),
    logit_bias: z.record(z.number()),

    top_k: z.number(), // not OpenAI
    transforms: z.array(z.string()), // OpenRouter only (?)
    user: z.string(), // OpenAI only

    stream: z.boolean(),
  })
  .partial()

export type AllChatParameters = z.infer<typeof allChatParametersSchema>
