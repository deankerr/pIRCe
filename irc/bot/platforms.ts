import { z } from 'zod'

//^ attach + validate at start?
// TODO: temp headers set up. keys also can be in db
// ? function call gets headers, retrieves env/db values at that time

export const platforms = {
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
        'HTTP-Referer': `${getEnv('OPENROUTER_YOUR_SITE_URL')}`, //& these in the db now
        // 'X-Title': `${getEnv('OPENROUTER_YOUR_APP_NAME')}`, //& optional
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
