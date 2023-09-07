import { z } from 'zod'

const chatRequiredSchema = z.object({
  model: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      name: z.string().optional(),
      content: z.string(),
    }),
  ),
})

const chatOptionalSchema = z
  .object({
    n: z.number(),
    max_tokens: z.number(),
    temperature: z.number(),
    top_p: z.number(),
    stop: z.array(z.string()), // ? or string
    presence_penalty: z.number(),
    frequency_penalty: z.number(),
    logit_bias: z.record(z.number()),

    user: z.string(),
    stream: z.boolean(),
  })
  .partial()

const chatRequestSchema = chatRequiredSchema.merge(chatOptionalSchema)

const chatResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: z.object({
        role: z.string(),
        content: z.string(),
      }),
      finish_reason: z.enum(['stop', 'length', 'function_call']),
    }),
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
})

const imageRequestSchema = z.object({
  prompt: z.string(),
  n: z.number(),
  size: z.string(), // '256x256' | '512x512' | '1024x1024'.string()
  response_format: z.string(), // 'url' | 'b64_json'.string()
  user: z.string().optional(),
})

const imageResponseSchema = z.object({
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
      schema: {
        request: chatRequestSchema,
        response: chatResponseSchema,
      },
    },
    image: {
      uri: '/images/generations',
      request: imageRequestSchema,
      response: imageResponseSchema,
    },
    moderation: {
      uri: '/moderations',
    },
  },
}
