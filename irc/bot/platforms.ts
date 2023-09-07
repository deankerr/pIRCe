import { z } from 'zod'

//^ attach + validate at start?
// TODO: temp headers set up. keys also can be in db
// ? function call gets headers, retrieves env/db values at that time

const platforms = {
  openai: {
    getHeaders: () => {
      return {
        headers: { Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}` },
      }
    },
    chat: 'https://api.openai.com/v1/chat/completions',
    image: 'https://api.openai.com/v1/images/generations',
    moderation: 'https://api.openai.com/v1/moderations',
  },
  openrouter: {
    getHeaders: () => {
      return {
        Authorization: `Bearer ${getEnv('OPENROUTER_API_KEY')}`,
        'HTTP-Referer': `${getEnv('OPENROUTER_YOUR_SITE_URL')}`, //& these in
        // 'X-Title': `${getEnv('OPENROUTER_YOUR_APP_NAME')}`, //& the db now
      }
    },
    chat: 'https://api.openai.com/v1/chat/completions',
  },
  togetherai: {
    getHeaders: () => {
      return {
        headers: { Authorization: `Bearer ${getEnv('TOGETHERAI_API_KEY')}` },
      }
    },
    chat: 'https://api.together.xyz/inference',
    image: 'https://api.together.xyz/inference',
    tempHeaders: [],
  },
} as const

const ggg = {
  Authorization: 'Bearer',
}

function getEnv(key: string) {
  if (!process.env[key]) throw new Error(`${key} not set`)
  return process.env[key]
}

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

// platform const definitions / specific handlers / schemas
// OpenAI / OpenRouter
// export const chatMessagesSchema = z.array(
//   z.object({
//     role: z.enum(['user', 'assistant', 'system', 'function']),
//     name: z.string().optional(),
//     content: z.string(),
//   }),
// )

// export const allChatParametersSchema = z
//   .object({
//     model: z.string(),
//     prompt: z.string(), // if this not messages
//     messages: chatMessagesSchema, // if this not prompt
//     // Common
//     n: z.number(),
//     max_tokens: z.number(),
//     temperature: z.number(),
//     top_p: z.number(),
//     stop: z.array(z.string()), // ? or string
//     presence_penalty: z.number(),
//     frequency_penalty: z.number(),
//     logit_bias: z.record(z.number()),

//     top_k: z.number(), // not OpenAI
//     transforms: z.array(z.string()), // OpenRouter only (?)
//     user: z.string(), // OpenAI only

//     stream: z.boolean(),
//   })
//   .partial()

// export type AllChatParameters = z.infer<typeof allChatParametersSchema>
