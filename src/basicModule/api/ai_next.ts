import type { Message } from '@prisma/client'
import axios, { AxiosResponse, isAxiosError } from 'axios'
import debug from 'debug'

import type { ChatEvent, ImageEvent } from './db.js'

const log = debug('pIRCe:ai')

// TODO count tokens (somewhere)
async function chat(botEvent: ChatEvent, contexual: Message[]) {
  try {
    const { chatModel, options, profile, message } = botEvent
    const { id, url, backend, ...parameters } = chatModel

    log('chat %o', id)

    const moderated = await moderate(botEvent, contexual)
    if (!moderated.success) return log('moderation failed')

    const prompt = buildOpenChatPrompt(
      profile.prompt,
      moderated.contextual,
      message,
      profile.promptTail,
    )
    log('%O', prompt)

    const response = await axios<AIChatRequest, AxiosResponse<AIChatResponse, AIChatRequest>>({
      method: 'post',
      url,
      headers: getBackendHeaders(backend),
      timeout: options.apiTimeoutMs,
      timeoutErrorMessage: 'Error: AI Request Timeout',

      data: {
        messages: prompt,
        ...parameters,
      },
    })

    const data = response.data.choices[0]
    return data
  } catch (error) {
    return handleError(error)
  }
}

const moderationCache = {
  profile: '',
  message: new Map<number, boolean>(),
  text: new Map<string, boolean>(),
}

async function moderate(botEvent: ChatEvent, contextual: Message[]) {
  try {
    const { chatModel, options, message, profile } = botEvent
    const { moderationProfile } = options

    // only moderate openAI
    if (chatModel.backend !== 'openAI') {
      return { success: true, contextual }
    }

    const log = debug('pIRCe:moderation')

    // invalidate cache on profile change
    if (moderationCache.profile !== moderationProfile.join(',')) {
      moderationCache.profile = moderationProfile.join(',')
      moderationCache.message.clear()
      moderationCache.text.clear()
    }

    // TODO cache
    const prompts = profile.prompt + profile.promptTail ?? ''
    const messages = [message, ...contextual].map((m) => `${m.nick}: ${m.content}`)

    const input = [prompts, ...messages]

    const response = await axios<
      OpenAIModerationRequest,
      AxiosResponse<OpenAIModerationResponse, OpenAIModerationRequest>
    >({
      method: 'post',
      url: 'https://api.openai.com/v1/moderations',
      headers: getBackendHeaders('openAI'),
      timeout: options.apiTimeoutMs,
      timeoutErrorMessage: 'Error: AI Request Timeout',
      data: {
        input,
      },
    })

    const rejectedCategories = response.data.results.map((result) => {
      // get flagged keys, remove allowed, return remaining objectional keys
      const categories = result.categories as Record<string, boolean>
      const flaggedKeys = Object.keys(categories).filter((k) => categories[k])
      return flaggedKeys.filter((k) => !moderationProfile.includes(k))
    })

    const results = {
      prompts: rejectedCategories[0],
      message: rejectedCategories[1],
      contextual: rejectedCategories.slice(2),
    }

    const promptsStatus = results.prompts.length === 0
    moderationCache.text.set(prompts, promptsStatus)
    if (!promptsStatus) log('[Rejected] System Prompt %o', results.prompts)

    const messageStatus = results.message.length === 0
    moderationCache.message.set(message.id, messageStatus)
    if (!messageStatus) log('[Rejected] %m %o', message, results.message)

    const contextualFiltered = contextual.filter((msg, i) => {
      const status = results.contextual[i].length === 0
      moderationCache.message.set(msg.id, status)
      if (!status) log('[Rejected] %m %o', msg, results.contextual[i])
      return status
    })

    return { success: promptsStatus && messageStatus, contextual: contextualFiltered }
  } catch (error) {
    handleError(error)
    return { success: false, contextual: [] }
  }
}

async function image(imageEvent: ImageEvent) {
  try {
    const log = debug('pIRCe:api.image')
    const { imageModel, message } = imageEvent
    log('image %o', imageModel.id)

    const { config, parameters } = getBackendRequestConfig(imageEvent)
    const prompt = message.content.replace(/^@\w*\s/, '')

    const response = await axios<
      OpenAIImageRequest,
      AxiosResponse<OpenAIImageResponse<'b64_json'>, OpenAIImageRequest>
    >({
      ...config,
      data: {
        prompt,
        ...parameters,
      },
    })

    const result = response.data.data[0].b64_json
    return { result }
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.data) {
      const { data } = error.response
      if (data.error.code === 'content_policy_violation') {
        log(data.error)
        return {
          error: data.error.message as string,
        }
      }
    }

    return handleError(error)
  }
}

export const ai = { chat, image }

function getBackendRequestConfig(botEvent: ChatEvent | ImageEvent) {
  const { options } = botEvent

  const model = 'chatModel' in botEvent ? botEvent.chatModel : botEvent.imageModel

  const { id, url, ...parameters } = model
  const backend = id.split('.')[0]

  const config = {
    method: 'post',
    url,
    timeout: options.apiTimeoutMs,
    timeoutErrorMessage: 'Error: AI Request Timeout',
    headers: {} as Record<string, string>,
  }

  if (backend === 'openai') {
    config.headers = { Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}` }
  }

  if (backend === 'openrouter') {
    config.headers = {
      Authorization: `Bearer ${getEnv('OPENROUTER_API_KEY')}`,
      'HTTP-Referer': getEnv('OPENROUTER_YOUR_SITE_URL'),
      'X-Title': getEnv('OPENROUTER_YOUR_APP_NAME'),
    }
  }

  return { config, parameters }
}

function getEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} not set`)
  return value
}

function getBackendHeaders(backend: 'openAI' | 'openRouter') {
  if (backend === 'openAI') {
    // OpenAI api key
    if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set')

    return {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    }
  } else {
    // OpenRouter api key + required headers
    if (!process.env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY not set')
    if (!process.env.OPENROUTER_YOUR_SITE_URL) throw new Error('OPENROUTER_YOUR_SITE_URL not set')
    if (!process.env.OPENROUTER_YOUR_APP_NAME) throw new Error('OPENROUTER_YOUR_APP_NAME not set')

    return {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.OPENROUTER_YOUR_SITE_URL,
      'X-Title': process.env.OPENROUTER_YOUR_APP_NAME,
    }
  }
}

const roles = {
  system: 'system',
  user: 'user',
  assistant: 'assistant',
} as const

// TODO proper command striping/nick replace
function buildOpenChatPrompt(
  system: string,
  conversation: Message[],
  message: Message,
  tail?: string | null,
) {
  const messages = [...conversation, message].map((msg) => {
    if (msg.self) {
      return { role: roles.assistant, content: msg.content }
    } else {
      return {
        role: roles.user,
        name: msg.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
        content: msg.content,
      }
    }
  })

  const prompt = [{ role: roles.system, content: system }, ...messages]

  if (tail) {
    prompt.push({ role: roles.system, content: tail })
  }

  return prompt
}

function handleError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response) {
      // API error
      const { status, statusText, data } = error.response
      log('*** API Response Error ***')
      log('Status: (%s) %s', status, statusText)
      'error' in data ? log('%o', data.error) : log('%O', data)

      return error
    } else if (error.request) {
      // No response received
      log('*** API Request Error ***')
      log(error.request)

      return error
    } else {
      // Error creating request
      log('*** API Create Request Error ***')
      log(error.message)

      return error
    }
  } else {
    if (error instanceof Error) {
      // something unrelated to axios
      log('*** Unknown API Error ***')
      log(error)

      return error
    } else {
      // something happened ???
      throw new Error('Unknown error error')
    }
  }
}

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
    content: string | null
    // function_call?: OpenAIFunctionCall
  }
}

export type AIChatMessage = {
  role: 'user' | 'assistant' | 'system' | 'function'
  name?: string // required if role is 'function'
  content: string | null
  function_call?: OpenAIFunctionCall
}

export type OpenAIFunctionCall = {
  arguments: string // JSON
  name: string
}

type OpenAIModerationRequest = {
  input: string | string[]
  model?: 'text-moderation-stable' | 'text-moderation-latest'
}

type OpenAIModerationResponse = {
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

type OpenAIImageRequest = {
  prompt: string
  n: number
  size: '256x256' | '512x512' | '1024x1024'
  response_format: 'url' | 'b64_json'
  user?: string
}

type OpenAIImageResponse<T extends 'url' | 'b64_json'> = {
  data: T extends 'url' ? { url: string }[] : { b64_json: string }[]
}

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
