import type { ChatModel } from '@prisma/client'
import axios, { isAxiosError } from 'axios'
import debug from 'debug'

import { getChatModel, getOptions } from './db.js'

const log = debug('pIRCe:api:ai')

// ? get model from db earlier, pass model obj in
// TODO count tokens (somewhere)
async function chat(modelID: string, messages: AIChatMessage[]) {
  try {
    const model = await getChatModel(modelID)
    const nModel = normalizeParameters(model)

    const { apiTimeoutMs } = await getOptions()
    const { id, url, headers, ...parameters } = nModel

    log('ai.chat: %o messages[%d]', id, messages.length)

    const response = await axios<AIChatResponse>({
      method: 'post',
      url,
      headers,

      timeout: apiTimeoutMs,
      timeoutErrorMessage: 'Error: AI API Timeout',

      data: {
        messages,
        ...parameters,
      },
    })

    const data = response.data.choices[0]
    log('res.data: %o', data)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        // API error
        log('*** API Response Error ***')
        const { status, statusText, data } = error.response
        log('Status: (%s) %s', status, statusText)
        log('Data:', data)
        return error
        /* 
          pIRCe:api:ai *** API Response Error *** +510ms
          pIRCe:api:ai Status: (400) Bad Request +1ms
          pIRCe:api:ai Data: {
            error: {
              message: 'Unrecognized request argument supplied: choices',
              type: 'invalid_request_error',
              param: null,
              code: null
            }
          } +0ms
        */
      } else if (error.request) {
        // No response received
        log('*** API Request Error ***')
        log(error.request)
        return error
      } else {
        log('*** API Create Request Error ***')
        log(error.message)
        return error
      }
    } else {
      if (error instanceof Error) {
        log('*** Unknown API Error ***')
        log(error)
        return error
      } else {
        throw new Error('Unknown error error')
      }
    }
  }
}

export const ai = { chat }

function normalizeParameters(model: Awaited<ReturnType<typeof getChatModel>>) {
  const backend = model.url.includes('openai.com')
    ? 'openAI'
    : model.url.includes('openrouter.ai')
    ? 'openRouter'
    : null
  if (!backend) throw new Error('Unrecognised backend type/URL')

  const apiKeys = {
    openAI: process.env.OPENAI_API_KEY,
    openRouter: process.env.OPENROUTER_API_KEY,
  }

  const apiKey = apiKeys[backend]
  if (!apiKey) throw new Error('No API key found for backend ' + backend)

  model.headers['Authorization'] = `Bearer ${apiKey}`

  if (backend === 'openAI') {
    const { top_k, transforms, ...params } = model
    return params
  } else {
    // strip function params when these exist
    return model
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

export type AIErrorResponse = {
  error: {
    code: number
  }
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
