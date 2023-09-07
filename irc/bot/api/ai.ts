import type { Platform } from '@prisma/client'
import type {
  ModelParameters,
  OpenAIImageResponseB64,
  Options,
  TogetherAIImageResponse,
} from '../types.js'
import axios, { isAxiosError } from 'axios'
import debug from 'debug'

const log = debug('pIRCe:ai')

// TODO count tokens (somewhere)

// TODO better payload type
async function image(platform: Platform, parameters: ModelParameters, options: Options) {
  try {
    const log = debug('pIRCe:api.image')

    log('%s %o', platform.label, parameters.prompt)

    let url = ''

    // TODO platform specific set up
    if (platform.id === 'openai') url = 'https://api.openai.com/v1/images/generations'
    if (platform.id === 'togetherai') url = 'https://api.together.xyz/inference'

    const config = createConfig(url, options)

    const response = await axios<OpenAIImageResponseB64 | TogetherAIImageResponse>({
      ...config,
      data: parameters,
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
    return handleError(error)
  }
}

export const ai = { image }

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
      const { status, statusText } = error.response
      log('*** API Response Error ***')
      log('Status: (%s) %s', status, statusText)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      'error' in error.response.data
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          log('%o', error.response.data?.error)
        : log('%O', error.response.data)

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
