import { z } from 'zod'

// platform const definitions / specific handlers / schemas
// OpenAI / OpenRouter
export const chatMessagesSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant', 'system', 'function']),
    name: z.string().optional(),
    content: z.string(),
  }),
)

export const allChatParametersSchema = z
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

export const imageRequestSchema = z.object({
  prompt: z.string(),
  n: z.number(),
  size: z.string(), // '256x256' | '512x512' | '1024x1024'.string()
  response_format: z.string(), // 'url' | 'b64_json'.string()
  user: z.string().optional(),
})

export const imageResponseSchema = z.object({
  created: z.number(),
  data: z.array(
    z.object({
      url: z.string(),
    }),
  ),
})

export const openai = {
  baseUrl: 'https://api.openai.com/v1',
  endpoints: {
    chat: {
      uri: '/chat/completions',
    },
    image: {
      uri: '/images/generations',
    },
    moderation: {
      uri: '/moderations',
    },
  },
}
