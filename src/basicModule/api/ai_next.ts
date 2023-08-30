import axios, { isAxiosError } from 'axios'
import debug from 'debug'

import { getOptions, type OpenChatModel } from './db.js'

const log = debug('pIRCe:ai')

// TODO count tokens (somewhere)
async function chat(model: OpenChatModel, messages: AIChatMessage[]) {
  try {
    log('chat %o messages[%d]', model.id, messages.length)

    const { apiTimeoutMs } = await getOptions()
    const { id, url, backend, ...parameters } = model

    const response = await axios<AIChatResponse>({
      method: 'post',
      url,
      headers: getBackendHeaders(backend),

      timeout: apiTimeoutMs,
      timeoutErrorMessage: 'Error: AI Request Timeout',

      data: {
        messages,
        ...parameters,
      },
    })

    const data = response.data.choices[0]
    return data
  } catch (error) {
    return handleError(error)
  }
}

export const ai = { chat }

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

export type AIChatRequestParameters = {
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

/* 
  400	BadRequestError
  401	AuthenticationError
  403	PermissionDeniedError
  404	NotFoundError
  422	UnprocessableEntityError
  429	RateLimitError
  >=500	InternalServerError
  N/A	APIConnectionError
*/
