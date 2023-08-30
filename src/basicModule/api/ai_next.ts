import type { Message } from '@prisma/client'
import axios, { AxiosResponse, isAxiosError } from 'axios'
import debug from 'debug'

import { BotEvent, getMessagesTag, getOptions, type OpenChatModel } from './db.js'

const log = debug('pIRCe:ai')

// TODO count tokens (somewhere)
async function chat(botEvent: BotEvent, messages: AIChatMessage[]) {
  try {
    const { chatModel, options } = botEvent
    if (!chatModel) throw new Error('Missing chat model')

    log('chat %o messages[%d]', chatModel.id, messages.length)
    const { id, url, backend, ...parameters } = chatModel

    const ms = await moderate(botEvent, messages)

    const response = await axios<AIChatRequest, AxiosResponse<AIChatResponse, AIChatRequest>>({
      method: 'post',
      url,
      headers: getBackendHeaders(backend),
      timeout: options.apiTimeoutMs,
      timeoutErrorMessage: 'Error: AI Request Timeout',

      data: {
        messages: [],
        ...parameters,
      },
    })

    const data = response.data.choices[0]
    return data
  } catch (error) {
    return handleError(error)
  }
}

// TODO way to indicate if trigger msg failed
async function moderate(botEvent: BotEvent, messages: AIChatMessage[]) {
  try {
    const { chatModel, options } = botEvent
    if (!chatModel) throw new Error('Missing chat model')
    // only moderate openAI
    if (chatModel.backend !== 'openAI') {
      return messages
    }

    const { moderationCategoryExclusions } = options
    const excludeList = JSON.parse(moderationCategoryExclusions) as string[]
    log('moderate! ex:', excludeList)
    log(messages)

    const input =  messages.map((m) => `${m.name}: ${m.content}`)

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
        input
      },
    })

    const { results } = response.data

    function judgeContent(categories: Record<string, boolean>) {
      const flaggedKeys = Object.keys(categories).filter((k) => categories[k])
      return flaggedKeys.filter((k) => !excludeList.includes(k))
    }

    let rejectEvent = false

    const filteredMessages = messages.filter((msg, i) => {
      const rejectKeys = judgeContent(results[i].categories)
      if (rejectKeys.length > 0) {
        log('Rejected: %m %o', msg, rejectKeys)
        if (botEvent.message.id === msg.)
      }
    })

    messages.forEach((msg, i) => {
      const rejectKeys = judgeContent(results[i].categories)
      if (rejectKeys.length > 0) {
        log('Rejected: %m %o', msg, rejectKeys)
        if ()
      }
    })


    // reduce to list of accepted messages
    // first result (trigger message) fail rejects all // TODO
    const resultMsgs = messages.reduceRight<AIChatMessage[]>((acc, msg, i) => {
      const { categories } = results[i]
      const flaggedKeys = Object.keys(categories).filter(
        (k) => categories[k as keyof typeof categories],
      )
      const rejectableKeys = flaggedKeys.filter((k) => !excludeList.includes(k))

      // all flagged keys excluded, message accepted
      if (rejectableKeys.length === 0) {
        log(
          'OK: %s %o',
          msg,
          flaggedKeys.filter((k) => excludeList.includes(k)),
        )
        return [msg, ...acc]
      }

      // reject vile message of satan
      log('Mod failed: %s %o', msg, rejectableKeys)
      return acc
    }, [])

    // log('results: %o', response.data.results)
    log('resmsgs: %o', resultMsgs)

    
    //! temp
    return messages
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
