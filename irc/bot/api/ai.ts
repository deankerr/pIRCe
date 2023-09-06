/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Platform } from '@prisma/client'
import type {
  AIChatMessage,
  AIChatResponse,
  OpenAIImageResponseB64,
  OpenAIModerationResponse,
  Options,
  TogetherAIImageResponse,
} from '../types.js'
import axios, { isAxiosError } from 'axios'
import debug from 'debug'
import { getOptions } from './db.js'

const log = debug('pIRCe:ai')

// TODO count tokens (somewhere)

async function chat(platform: Platform, payload: Record<string, unknown>, options: Options) {
  try {
    log('chat %o', platform.label)

    let url = ''

    if (platform.id === 'openai') url = 'https://api.openai.com/v1/chat/completions'
    if (platform.id === 'openrouter') url = 'https://openrouter.ai/api/v1/chat/completions'
    if (platform.id === 'togetherai') url = 'https://api.together.xyz/inference'

    const config = createConfig(url, options)
    const response = await axios<AIChatResponse>({ ...config, data: payload })

    return response.data.choices[0]
  } catch (error) {
    return handleError(error)
  }
}

async function moderateMessages(messages: AIChatMessage[], options: Options) {
  try {
    log('moderate OpenAI')

    const { moderationProfile } = await getOptions()

    const config = createConfig('https://api.openai.com/v1/moderations', options)
    const data = { input: messages.map((m) => `${m.name ?? ''} ${m.content}`) }

    log('moderate %o', 'openai')
    const response = await axios<OpenAIModerationResponse>({ ...config, data })

    // get flagged keys, remove allowed, return remaining objectional keys
    const parsed = response.data.results.map((result) => {
      const categories = result.categories as Record<string, boolean>
      const flaggedKeys = Object.keys(categories).filter((k) => categories[k])
      return flaggedKeys.filter((k) => !moderationProfile.includes(k))
    })

    return parsed
  } catch (error) {
    return handleError(error)
  }
}

// TODO better payload type
async function image(platform: Platform, payload: Record<string, string>, options: Options) {
  try {
    const log = debug('pIRCe:api.image')

    log('%s %o', platform.label, payload.prompt)

    let url = ''

    // TODO platform specific set up
    if (platform.id === 'openai') url = 'https://api.openai.com/v1/images/generations'
    if (platform.id === 'togetherai') url = 'https://api.together.xyz/inference'

    const config = createConfig(url, options)

    const response = await axios<OpenAIImageResponseB64 | TogetherAIImageResponse>({
      ...config,
      data: payload,
    })

    let result

    // TODO proper validation
    if ('data' in response.data) {
      result = response.data.data[0]?.b64_json
    } else if ('output' in response.data) {
      result = response.data.output.choices[0]?.image_base64
    } else {
      throw new Error('Unknown result')
    }

    if (!result) throw new Error('Unknown result')

    return { result }
  } catch (error) {
    // TODO fix this
    if (isAxiosError(error) && error?.response?.data) {
      const { data } = error.response
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const code = data?.error?.code
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const message = data?.error?.message
      if (
        typeof code === 'string' &&
        code === 'content_policy_violation' &&
        typeof message === 'string'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        log(data.error)
        return {
          error: message,
        }
      }
    }

    return handleError(error)
  }
}

export const ai = { chat, image, moderateMessages }

function createConfig(url: string, options: Options) {
  return {
    method: 'post',
    url,
    headers: getBackendHeaders(url),
    timeout: options.apiTimeoutMs,
    timeoutErrorMessage: 'Error: AI Request Timeout',
  }
}

function getBackendID(url: string) {
  if (url.includes('openai.com')) return 'openai' as const
  if (url.includes('openrouter.ai')) return 'openrouter' as const
  if (url.includes('together.xyz')) return 'together' as const
  throw new Error('Unknown backend: ' + url)
}

function getBackendHeaders(url: string) {
  const backendID = getBackendID(url)

  switch (backendID) {
    case 'openai':
      return { Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}` }
    case 'openrouter':
      return {
        Authorization: `Bearer ${getEnv('OPENROUTER_API_KEY')}`,
        'HTTP-Referer': getEnv('OPENROUTER_YOUR_SITE_URL'),
        'X-Title': getEnv('OPENROUTER_YOUR_APP_NAME'),
      }
    case 'together':
      return {
        Authorization: `Bearer ${getEnv('TOGETHERAI_API_KEY')}`,
      }
    default:
      throw new Error(`Unknown backend`)
  }
}

function getEnv(key: string) {
  if (!process.env[key]) throw new Error(`${key} not set`)
  return process.env[key]
}

function handleError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response) {
      // API error
      const { status, statusText, data } = error.response
      log('*** API Response Error ***')
      log('Status: (%s) %s', status, statusText)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      'error' in data ? log('%o', data?.error) : log('%O', data)

      return error
    } else if (error.request) {
      // No response received
      log('*** API Request Error ***')
      // log(error.request)
      log(error.message)
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
