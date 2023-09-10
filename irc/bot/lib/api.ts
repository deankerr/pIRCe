import type { Platform } from '@prisma/client'
import type { Options } from '../types.js'
import debug from 'debug'
import got, { HTTPError } from 'got'
import { platforms } from '../platforms.js'
import { create } from './../lib/file.js'

const log = debug('pIRCe:api')

// TODO timeout options
export async function request(
  platform: Platform,
  feature: string,
  payload: object,
  options: Options,
) {
  try {
    const { url, headers } = getPlatformConfig(platform, feature, options)

    log('%s %o %s', platform.label, url, feature)
    const response = await got
      .post({
        url,
        headers,
        json: payload,
      })
      .json()

    return response
  } catch (error) {
    if (error instanceof HTTPError) {
      log(`response error: ${error.name} ${error.message}`)
      log('response body: %o', error.response.body)
    }
    await create.errorLog(`api-${feature}`, error)
    throw error
  }
}

function getPlatformConfig(platform: Platform, feature: string, options: Options) {
  if (!(platform.id in platforms)) throw new Error(`Unknown platform id: ${platform.id}`)
  const platformRecord = platforms[platform.id as keyof typeof platforms]

  if (!(feature in platformRecord.features)) {
    throw new Error(`Unsupported feature: ${feature} for platform id: ${platform.id}`)
  }

  const url = platformRecord.features[feature as keyof typeof platformRecord.features]
  const headers = { ...platformRecord.headers }

  const key = platform.apiKey ?? process.env[`${platform.id.toUpperCase()}_API_KEY`]
  if (!key) throw new Error(`Missing API key for: ${platform.id}`)

  if ('Authorization' in headers) {
    headers.Authorization += ` ${key}`
  }

  if ('HTTP-Referer' in headers) {
    const value = options.appURL ?? 'http://site.url'
    headers['HTTP-Referer'] += `${value}`
  }

  if ('X-Title' in headers) {
    const value = options.appName ?? 'a pIRCeBot'
    headers['X-Title'] += `${value}`
  }

  return { url, headers }
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

/* 
    OpenRouter
    400: Bad Request (invalid or missing params, CORS)
    401: Invalid credentials (OAuth session expired, disabled/invalid API key)
    402: Out of credits
    403: Your chosen model requires moderation and your input was flagged
    408: Your request time out
    429: You are being rate limited
    502: Your chosen model is down or we received an invalid response from it
  
    type ErrorResponse = {
      error: {
        code: number
        message: string
      }
    }
  
    const request = await fetch("https://openrouter.ai/...")
    console.log(request.status) // Will be an error code unless the model started processing your request
    const response = await request.json()
    console.error(response.error?.status) // Will be an error code
    console.error(response.error?.message)
  
  
    
OpenAI/OpenRouter Chat Parameters
model             String
max_tokens        Int    @default(128)
temperature       Float  @default(1)
top_p             Int    @default(1)
n                 Int    @default(1)
stop              String @default("[]")
presence_penalty  Float  @default(0)
frequency_penalty Float  @default(0)
logit_bias        String @default("{}")

OpenRouter only
top_k      Int    @default(0)
transforms String @default("[\"middle-out\"]")

OpenAI Image Parameters
 n               Int    @default(1)
 size            String @default("1024x1024")
 response_format String @default("b64_json") // or "url"

  */