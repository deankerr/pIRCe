import axios from 'axios'
import debug from 'debug'

const config_Shared = {
  chat: 'chat/completions',
}

const log = debug('pIRCe:llm')

const requestConfig = {
  openAI: {
    baseURL: 'https://api.openai.com/v1/',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  },
  openRouter: {
    baseURL: 'https://openrouter.ai/api/v1',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.OPENROUTER_YOUR_SITE_URL,
      'X-Title': process.env.OPENROUTER_YOUR_APP_NAME,
    },
  },
}

const backendModels = {
  gpt3_5turbo: {
    openAI: 'gpt-3.5-turbo',
    openRouter: 'openai/gpt-3.5-turbo',
  },
  default: {
    openAI: 'gpt-3.5-turbo',
    openRouter: 'openai/gpt-3.5-turbo', // ! OR -> OAI upstream API currently down
  },
}

const testMessages = [
  { role: 'user', content: "I'm testing my app, respond with a random made-up name" },
]

const BACKEND = {
  OPENAI: 'openAI',
  OPENROUTER: 'openRouter',
} as const

export async function llmTestReq() {
  try {
    const backend = BACKEND.OPENROUTER
    log('llmTestReq! %s', backend)

    const reqConfig = requestConfig[backend]
    const model = backendModels.default[backend]
    const messages = testMessages

    const res = await axios({
      method: 'post',
      timeout: 10000,
      timeoutErrorMessage: 'Timeout Error!',

      ...reqConfig,
      url: config_Shared.chat, // chat is the only one we care about? completions?

      data: {
        model,
        messages,
      },
    })

    log('*** Success(?) ***')
    log(res.data)
    log(res.data?.choices[0])
    const result: Record<string, string> = { message: 'hyuckl!' }
    return result
  } catch (error) {
    log('*** Error ***')
    if (error instanceof axios.AxiosError && error.response) {
      // API error
      log('*** Response ***')
      const { status, statusText, data } = error.response
      log('Status: (%s) %s', status, statusText)
      log('Data:', JSON.parse(data))
    } else {
      // Non-API error
      log('*** Unknown ***')
      log(error)
      return null
    }
  }
}

export type OpenAIChatRequestParameters = {
  model: string // technically optional on OR
  messages: OpenAIChatMessage[]
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

export type OpenAIChatResponse = {
  id: string
  choices: OpenAIChatResponseChoice[]
  created: number
  model: string
  object: string
  usage?: Record<string, number> // OpenAI only
}

export type OpenAIChatResponseChoice = {
  finish_reason: 'stop' | 'length' | 'function_call'
  index: number
  message: {
    role: 'system' | 'user' | 'assistant' | 'function'
    content: string | null
    function_call?: OpenAIFunctionCall
  }
}

export type OpenAIChatMessage = {
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
