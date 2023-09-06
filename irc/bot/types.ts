import type { Handler, Message, Model, Platform, Profile as RawProfile } from '@prisma/client'
import type { getOptions } from './api/db.js'

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
  handler: Handler
  profile: Profile | null
  model: Model | null
  platform: Platform | null
}

export type ActionContext = {
  message: Message
  options: Options
  handler: Handler
  profile: Profile
  model: Model
  platform: Platform
}

export type Profile = Omit<RawProfile, 'parameters'> & { parameters: ModelParameters }

export type ModelParameters = Partial<
  AIChatRequest & OpenAIImageRequest & TogetherAIImageRequest & Record<string, unknown>
>

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
  transforms?: string[]
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

export type TogetherAIImageRequest = {
  model: string
  prompt: string
  n: number
  steps: number
  width: number
  height: number
}

export type TogetherAIImageResponse = {
  status: string
  prompt: string[]
  model: string
  model_owner: string
  tags: object // ?
  num_returns: number
  args: Record<string, string | number | string[]> // ?
  subjobs: unknown[] // ?
  output: {
    choices: { image_base64: string }[] // TODO chat
    result_type: string
  }
}

/* 
  Together AI response image
{
  "status": "finished",
  "prompt": [
    "The capital of France is"
  ],
  "model": "SG161222/Realistic_Vision_V3.0_VAE",
  "model_owner": "",
  "tags": {},
  "num_returns": 1,
  "args": {
    "model": "SG161222/Realistic_Vision_V3.0_VAE",
    "prompt": "The capital of France is",
    "max_tokens": 128,
    "stop": [
      "."
    ],
    "temperature": 0.7,
    "top_p": 0.7,
    "top_k": 50,
    "repetition_penalty": 1
  },
  "subjobs": [],
  "output": {
    "choices": [
      {
        "image_base64": "BLAHBLAHBLAH..."
      }
    ],
    "result_type": "image-model-inference"
  }
}

*/

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
  
  
    
OpenAI/OpenRouter Chat Parameters
model             String
max_tokens        Int    @default(128)
temperature       Float  @default(1)
top_p             Int    @default(1)
n                 Int    @default(1)
stop              String @default("[]")
presence_penalty  Float  @default(0)
frequency_penalty Float  @default(0)
logit_bias        String @default("{}")

OpenRouter only
top_k      Int    @default(0)
transforms String @default("[\"middle-out\"]")

OpenAI Image Parameters
 n               Int    @default(1)
 size            String @default("1024x1024")
 response_format String @default("b64_json") // or "url"

  */
