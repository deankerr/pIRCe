import axios, { isAxiosError } from 'axios'
import debug from 'debug'

import { getChatModel, getOptions } from './db.js'

const log = debug('pIRCe:ai')

// ? get model from db earlier, pass model obj in
// TODO count tokens (somewhere)
async function chat(modelID: string, messages: AIChatMessage[]) {
  try {
    log('ai.chat %o messages[%d]', modelID, messages.length)

    const model = await getChatModel(modelID)
    const nModel = normalizeParameters(model)

    const { apiTimeoutMs } = await getOptions()
    const { id, url, headers, ...parameters } = nModel

    const response = await axios<AIChatResponse>({
      method: 'post',
      url,
      headers,

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

function normalizeParameters(model: Awaited<ReturnType<typeof getChatModel>>) {
  // determine backend provider from url
  const backend = model.url.includes('openai.com')
    ? 'openAI'
    : model.url.includes('openrouter.ai')
    ? 'openRouter'
    : null
  if (!backend) throw new Error('Unrecognised backend type/URL')

  // add api key
  const apiKey = backend === 'openAI' ? process.env.OPENAI_API_KEY : process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('No API key found for backend ' + backend)
  model.headers['Authorization'] = `Bearer ${apiKey}`

  if (backend === 'openAI') {
    // strip incompatible params
    const { top_k, transforms, ...params } = model
    return params
  } else {
    // strip function params when these exist
    return model
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
