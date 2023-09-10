import type { Platform } from '@prisma/client'
import type { PlatformID } from '../platforms.js'
import type { Options } from '../types.js'
import debug from 'debug'
import got, { HTTPError } from 'got'
import { platforms2 } from '../platforms.js'
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
