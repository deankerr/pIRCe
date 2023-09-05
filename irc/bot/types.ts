import type { Message, Model, Profile, Route } from '@prisma/client'
import type { getOptions } from './api/db.js'

export type Options = Awaited<ReturnType<typeof getOptions>>

export type EventMessage = {
  server: string
  target: string
  nick: string
  content: string
  type: string
  self: boolean
  mask: string
}

export type BotEvent = {
  route: Route
  message: Message
  options: Options
  profile?: Profile
  model?: Model
}

export type ChatEvent = {
  route: Route
  message: Message
  options: Options
  profile: Profile
  model: Model
}

export type ImageEvent = {
  route: Route
  message: Message
  options: Options
  profile?: Profile
  model: Model
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

  // OpenAI only
  functions?: OpenAIFunctionCall[]
  function_call?: string
  // OpenRouter only
  top_k?: number
  transforms?: [] | ['middle-out']
}

export type AIChatResponse = {
  id: string
  choices: AIChatResponseChoice[]
  created: number
  model: string
  object: string
  usage?: Record<string, number> // OpenAI only
}

export type AIChatResponseChoice = {
  finish_reason: 'stop' | 'length' | 'function_call'
  index: number
  message: {
    role: 'system' | 'user' | 'assistant' | 'function'
    content: string
    // function_call?: OpenAIFunctionCall
  }
}

export type AIChatMessage = {
  role: 'user' | 'assistant' | 'system' | 'function'
  name?: string // required if role is 'function'
  content: string
  function_call?: OpenAIFunctionCall
}

export type OpenAIFunctionCall = {
  arguments: string // JSON
  name: string
}

export type OpenAIModerationRequest = {
  input: string | string[]
  model?: string // 'text-moderation-stable' | 'text-moderation-latest'
}

export type OpenAIModerationResponse = {
  id: string
  model: string
  results: {
    flagged: boolean
    categories: {
      sexual: boolean
      hate: boolean
      harassment: boolean
      'self-harm': boolean
      'sexual/minors': boolean
      'hate/threatening': boolean
      'violence/graphic': boolean
      'self-harm/intent': boolean
      'self-harm/instructions': boolean
      'harassment/threatening': boolean
      violence: boolean
    }
    categories_scores: {
      sexual: number
      hate: number
      harassment: number
      'self-harm': number
      'sexual/minors': number
      'hate/threatening': number
      'violence/graphic': number
      'self-harm/intent': number
      'self-harm/instructions': number
      'harassment/threatening': number
      violence: number
    }
  }[]
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

/* 
    OpenAI Error
    400	BadRequestError
    401	AuthenticationError
    403	PermissionDeniedError
    404	NotFoundError
    422	UnprocessableEntityError
    429	RateLimitError
    >=500	InternalServerError
    N/A	APIConnectionError
  
    log(error.status) // e.g. 401
    log(error.message) // e.g. The authentication token you passed was invalid...
    log(error.code) // e.g. 'invalid_api_key'
    log(error.type) // e.g. 'invalid_request_error'
  */

/* 
    OpenRouter
    400: Bad Request (invalid or missing params, CORS)
    401: Invalid credentials (OAuth session expired, disabled/invalid API key)
    402: Out of credits
    403: Your chosen model requires moderation and your input was flagged
    408: Your request time out
    429: You are being rate limited
    502: Your chosen model is down or we received an invalid response from it
  
    type ErrorResponse = {
      error: {
        code: number
        message: string
      }
    }
  
    const request = await fetch("https://openrouter.ai/...")
    console.log(request.status) // Will be an error code unless the model started processing your request
    const response = await request.json()
    console.error(response.error?.status) // Will be an error code
    console.error(response.error?.message)
  
  
  */
