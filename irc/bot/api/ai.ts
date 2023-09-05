/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Model } from '@prisma/client'
import type {
  AIChatMessage,
  AIChatResponse,
  ImageEvent,
  OpenAIImageResponseB64,
  OpenAIModerationResponse,
  Options,
  TogetherAIImageResponse,
} from '../types.js'
import axios, { isAxiosError } from 'axios'
import debug from 'debug'
import { normalizeAPIInput } from '../util/input.js'
import { getOptions } from './db.js'

const log = debug('pIRCe:ai')

// TODO count tokens (somewhere)

async function chat(model: Model, messages: AIChatMessage[]) {
  try {
    const { id, url, parameters } = model
    log(
      'chat %o %o',
      id,
      messages.findLast((m) => m.role === 'user'),
    )

    const parsedParams = JSON.parse(parameters) as Record<string, string>
    const data = {
      ...parsedParams,
      messages,
    }

    const config = await getAxiosConfig(url)
    const response = await axios<AIChatResponse>({ ...config, data })

    return response.data.choices[0]
  } catch (error) {
    return handleError(error)
  }
}

async function moderateMessages(messages: AIChatMessage[]) {
  try {
    const { moderationProfile } = await getOptions()

    const config = await getAxiosConfig('https://api.openai.com/v1/moderations')
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

async function image(imageEvent: ImageEvent) {
  try {
    const log = debug('pIRCe:api.image')

    const { model, message, options } = imageEvent
    const { id, url, parameters } = model
    const prompt = normalizeAPIInput(message.content, imageEvent.route.keyword ?? '')
    log('%o %m', id, prompt)

    const config = await getAxiosConfig(url, options)

    const params = JSON.parse(parameters) as Record<string, string>
    const data = {
      ...params,
      prompt,
    }

    const response = await axios<OpenAIImageResponseB64 | TogetherAIImageResponse>({
      ...config,
      data,
    })
    log(response.data)

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

async function getAxiosConfig(url: string, options?: Options) {
  const opts = options ? options : await getOptions()
  return {
    method: 'post',
    url,
    headers: getBackendHeaders(url),
    timeout: opts.apiTimeoutMs,
    timeoutErrorMessage: 'Error: AI Request Timeout',
  }
}

function getBackendID(model: Model | string) {
  const url = typeof model === 'string' ? model : model.url
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
      log(error.request)
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
