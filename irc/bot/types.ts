import type { Handler, Message, Model, Platform, Profile } from '@prisma/client'
import type { respond } from './command'
import type { getOptions } from './lib/db.js'

export type Options = Awaited<ReturnType<typeof getOptions>>

export type IRCEventMessage = {
  server: string
  target: string
  nick: string
  content: string
  type: string
  self: boolean
  mask: string
}

export type InitialContext = {
  message: Message
  options: Options
  self: Self
  respond: typeof respond
  handler: Handler
}

export type ActionContext = {
  message: Message
  options: Options
  self: Self
  handler: Handler
  respond: typeof respond
  profile: Profile
  model: Model
  platform: Platform
}

export type ModelParameters = Partial<
  AIChatRequest & OpenAIImageRequest & TogetherAIImageRequest & Record<string, unknown>
>

type Self = {
  server: string
  nick: string
}

//* API
//* OpenAI / OpenRouter

export type AIChatRequest = {
  model: string // technically optional on OR
  messages: AIChatMessage[]
  temperature?: number // 1
  top_p?: number // 1
  n?: number // 1
  stream?: boolean // false
  stop?: string | string[]
  max_tokens?: number // inf
  presence_penalty?: number // 0
  frequency_penalty?: number // 0
  logit_bias?: Record<string, number>
  user?: string // end user abuse tracking
  // OpenRouter only
  top_k?: number
  transforms?: string[]
}

export type AIChatMessage = {
  role: 'user' | 'assistant' | 'system'
  name?: string
  content: string
}

export type OpenAIImageRequest = {
  prompt: string
  n: number
  size: string // '256x256' | '512x512' | '1024x1024'
  response_format: string // 'url' | 'b64_json'
  user?: string
}

export type OpenAIImageResponseURL = { data: { url: string }[] }
export type OpenAIImageResponseB64 = { data: { b64_json: string }[] }

//* TogetherAI
export type TogetherAIImageRequest = {
  model: string
  prompt: string
  n: number
  steps: number
  width: number
  height: number
}
