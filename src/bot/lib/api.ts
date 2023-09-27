import type { ActionContext } from '../types.js'
import debug from 'debug'
import got, { HTTPError } from 'got'
import Replicate from 'replicate'
import { platforms } from '../platforms.js'
import { create } from './file.js'

const log = debug('pIRCe:api')

export async function request(
  ctx: ActionContext,
  feature: string,
  payload: Record<string, unknown>,
) {
  try {
    const { url, headers, key } = getPlatformConfig(ctx, feature)

    const label =
      'model' in payload ? `${ctx.platform.id}/${payload.model as string}` : ctx.platform.id
    log('%s: %o %s', feature, label, url)

    //* replicate only
    if (ctx.platform.id === 'replicate') {
      const replicate = new Replicate({ auth: key })

      const input = { prompt: payload.prompt }
      return replicate.run(
        payload.model as `${string}/${string}:${string}`, // ffs dude
        { input },
      )
    }

    //* everyone else
    const response = await got
      .post({
        url,
        headers,
        json: payload,
        timeout: {
          request: ctx.options.apiTimeoutMs,
        },
      })
      .json()

    return response
  } catch (error) {
    if (error instanceof HTTPError) {
      log(`response error: ${error.name} ${error.message}`)
      log('response body: %o', error.response.body)
    }
    create.errorLog(`api-${feature}`, error)
    throw error
  }
}

function getPlatformConfig(ctx: ActionContext, feature: string) {
  const platformRecord: PlatformRecord = platforms

  const platform = platformRecord[ctx.platform.id]
  if (!platform) throw new Error(`Unknown platform id: ${ctx.platform.id}`)

  const url = platform.features[feature]
  if (!url) throw new Error(`Unsupported feature: ${feature} for platform id: ${ctx.platform.id}`)

  const key = getApiKey(ctx)

  const headers = { ...platform.headers }

  if ('Authorization' in headers) {
    headers.Authorization += ` ${key}`
  }

  if ('HTTP-Referer' in headers) {
    const value = ctx.options.appURL ?? 'http://site.url'
    headers['HTTP-Referer'] += `${value}`
  }

  if ('X-Title' in headers) {
    const value = ctx.options.appName ?? 'a pIRCeBot'
    headers['X-Title'] += `${value}`
  }

  return { url, headers, key }
}

type PlatformRecord = Record<string, PlatformData>
type PlatformData = {
  features: Record<string, string>
  headers: Record<string, string>
}

function getApiKey(ctx: ActionContext) {
  const key = ctx.platform.apiKey ?? process.env[`${ctx.platform.id.toUpperCase()}_API_KEY`]
  if (!key) throw new Error(`Missing API key for: ${ctx.platform.id}`)
  return key
}

export async function pabel(
  type: 'chat' | 'moderation' | 'image',
  params: Record<string, unknown>,
) {
  try {
    const pabelURL = new URL(
      `/server/api/${type}`,
      process.env.PABEL_URL ?? raise('PABEL_URL not set'),
    )
    const request = await fetch(pabelURL, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' },
    })

    return request.json() as unknown
  } catch (error) {
    console.log('pabelChat api error')
    throw error
  }
}

function raise(message: string): never {
  throw new Error(message)
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
