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
