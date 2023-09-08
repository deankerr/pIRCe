import type { Platform } from '@prisma/client'
import type { ModelParameters, Options } from '../../types.js'
import axios, { isAxiosError } from 'axios'
import debug from 'debug'
import { z } from 'zod'
import { create } from '../../lib/file.js'
import { getPlatformInfo } from '../../platforms.js'

const log = debug('pIRCe:image:api')

export async function apiImage(platform: Platform, parameters: ModelParameters, options: Options) {
  try {
    log('%s %o', platform.label, parameters.prompt)

    const configInfo = getPlatformInfo(platform.id, 'image')
    const config = createConfig(configInfo, options)

    const schema = getPlatformSchema(platform.id)
    const data = schema.request.parse(parameters)

    const response = await axios({ ...config, data })

    //& response data file log
    await create.appendLog(`api-image-${platform.id ?? '?'}`, response.data)

    const parsed = schema.response.parse(response.data)

    if (platform.id === 'openai') {
      return { result: getImgOpenAI(parsed as OpenAIAIResponse) }
    }

    if (platform.id === 'togetherai') {
      return { result: getImgTogetherAI(parsed as TogetherAIResponse) }
    }

    throw new Error('unknown platform id')
  } catch (error) {
    return handleError(error)
  }
}

// TODO duplicated config code
function createConfig(info: TempPlatInfo, options: Options) {
  const { url, headers } = info
  return {
    method: 'post',
    url,
    headers,
    timeout: options.apiTimeoutMs,
    timeoutErrorMessage: 'Error: AI Request Timeout',
  }
}

type TempPlatInfo = {
  url: string
  headers: Record<string, string>
}

function handleError(error: unknown) {
  //& error log
  void create.errorLog(`error-image-api-${new Date().toISOString()}`, error)
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

function getPlatformSchema(key: string) {
  if (key in schema) {
    const id = key as keyof typeof schema
    return schema[id]
  } else {
    throw new Error(`Invalid schema key: ${key}`)
  }
}

//* Schema
const schema = {
  openai: {
    request: z.object({
      prompt: z.string(),
      n: z.number(),
      size: z.string(), // '256x256' | '512x512' | '1024x1024'
      response_format: z.string(), // 'url' | 'b64_json'
      user: z.string().optional(),
    }),
    response: z.object({
      created: z.number(),
      data: z.array(
        z.object({
          b64_json: z.string(), // TODO or url
        }),
      ),
    }),
  },

  togetherai: {
    request: z.object({
      model: z.string(),
      prompt: z.string(),
      n: z.number().optional(),
      steps: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    }),

    response: z.object({
      status: z.string(),
      prompt: z.string().array(),
      model: z.string(),
      model_owner: z.string(),
      tags: z.object({}).passthrough(), // ?
      num_returns: z.number(),
      args: z.object({}).passthrough(), // ? request params
      subjobs: z.unknown().array(), // ?
      output: z.object({
        choices: z.array(
          z.object({
            image_base64: z.string(),
          }),
        ),
        result_type: z.string(),
      }),
    }),
  },
}

type TogetherAIResponse = z.infer<(typeof schema)['togetherai']['response']>
type OpenAIAIResponse = z.infer<(typeof schema)['openai']['response']>

function getImgTogetherAI(data: TogetherAIResponse) {
  const img = data.output.choices[0]?.image_base64
  if (!img) throw new Error('invalid response for togetherai')
  return img
}

function getImgOpenAI(data: OpenAIAIResponse) {
  const img = data.data[0]?.b64_json
  if (!img) throw new Error('invalid response for openai')
  return img
}
