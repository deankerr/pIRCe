import type { Platform } from '@prisma/client'
import type { PlatformID } from '../platforms.js'
import type { Options } from '../types.js'
import debug from 'debug'
import got from 'got'
import { platforms2 } from '../platforms.js'

const log = debug('pIRCe:api')

export const reqAPI = { image }

export async function image(platform: Platform, payload: object, options: Options) {
  const { url, headers } = getPlatformConfig(platform, 'image', options)

  const response = await got
    .post({
      url,
      headers,
      json: payload,
    })
    .json()

  log(response)
}

function getPlatformConfig(platform: Platform, feature: string, options: Options) {
  if (!(platform.id in platforms2)) throw new Error(`Unknown platform id: ${platform.id}`)
  const id = platform.id as PlatformID
  const platformRecord = platforms2[id]

  if (!(feature in platformRecord.features)) {
    throw new Error(`Unsupported feature: ${feature} for platform id: ${platform.id}`)
  }

  const url = platformRecord.features[feature as keyof typeof platformRecord.features]
  const headers = { ...platformRecord.headers }

  const key = platform.apiKey ?? process.env[`${id.toUpperCase()}_API_KEY`]
  if (!key) throw new Error(`Missing API key for: ${id}`)

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
