import type { Platform } from '@prisma/client'
import type {
  AIChatMessage,
  ModelParameters,
  OpenAIModerationResponse,
  Options,
} from '../../types.js'
import axios, { isAxiosError } from 'axios'
import debug from 'debug'
import { z } from 'zod'
import { getOptions } from '../../api/db.js'
import { create } from '../../api/file.js'

const log = debug('pIRCe:chat:ai')

// TODO count tokens (somewhere)

//^ where does this live? const? own platforms file? da db??
//^ attach + validate at start?
// TODO: temp headers set up. keys also can be in db
// ? function call gets headers, retrieves env/db values at that time
const platforms: { chat: Record<string, TempPlatInfo> } = {
  chat: {
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      headers: { Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}` },
    },
    openrouter: {
      url: 'https://openrouter.ai/api/v1/chat/completions',
      headers: {
        Authorization: `Bearer ${getEnv('OPENROUTER_API_KEY')}`,
        'HTTP-Referer': `${getEnv('OPENROUTER_YOUR_SITE_URL')}`, //& these in
        // 'X-Title': `${getEnv('OPENROUTER_YOUR_APP_NAME')}`, //& the db now
      },
    },
    togetherai: {
      url: 'https://api.together.xyz/inference',
      headers: {
        Authorization: `Bearer ${getEnv('TOGETHERAI_API_KEY')}`,
      },
    },
  },
} satisfies { chat: Record<Platform['id'], TempPlatInfo> }

type TempPlatInfo = {
  url: string
  headers: Record<string, string>
}
//^ temp
const modHeaders = {
  url: 'https://api.openai.com/v1/moderations',
  headers: { Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}` },
}

export async function apiChat(platform: Platform, parameters: ModelParameters, options: Options) {
  try {
    log('chat %o', platform.label)

    const platInfo = platforms.chat[platform.id]
    if (!platInfo) throw new Error(`Unknown platform ID for chat api: ${platform.id}`)

    // TODO type db.getPlatform, schema function (platform, obj)
    const schema = getPlatformSchema(platform.id)
    const data = schema.request.parse(parameters)

    const config = createConfig(platInfo, options)
    const response = await axios({ ...config, data })

    const parsed = schema.response.parse(response.data)

    //& response data file log
    if (response) void create.appendLog(`api-chat-${platform.id ?? '?'}`, parsed)
    return parsed.choices[0]
  } catch (error) {
    return handleError(error)
  }
}

export async function apiModerateMessages(messages: AIChatMessage[], options: Options) {
  try {
    log('moderate OpenAI')

    const { moderationProfileList } = await getOptions()

    //^ ### temp
    const platInfo = modHeaders
    if (!platInfo) throw new Error(`Unknown platform ID for chat api: openai?`)

    const config = createConfig(platInfo, options)
    const data = { input: messages.map((m) => `${m.name ?? ''} ${m.content}`) }

    const response = await axios<OpenAIModerationResponse>({ ...config, data })

    // get flagged keys, remove allowed, return remaining objectional keys
    const parsed = response.data.results.map((result) => {
      const categories = result.categories as Record<string, boolean>
      const flaggedKeys = Object.keys(categories).filter((k) => categories[k])
      return flaggedKeys.filter((k) => !moderationProfileList.includes(k))
    })

    return parsed
  } catch (error) {
    return handleError(error)
  }
}

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

function getEnv(key: string) {
  if (!process.env[key]) throw new Error(`${key} not set`)
  return process.env[key]
}

function handleError(error: unknown) {
  //& error log
  void create.errorLog(`error-chat-api-${new Date().toISOString()}`, error)

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
//^ probs dont export
export const schema = {
  //* OpenAI
  openai: {
    request: z
      .object({
        model: z.string(),
        messages: z.array(
          z.object({
            role: z.enum(['user', 'assistant', 'system']),
            name: z.string().optional(),
            content: z.string(),
          }),
        ),

        n: z.number(),
        max_tokens: z.number(),
        temperature: z.number(),
        top_p: z.number(),
        stop: z.array(z.string()),
        presence_penalty: z.number(),
        frequency_penalty: z.number(),
        logit_bias: z.record(z.number()),

        user: z.string(),
        stream: z.boolean(),
      })
      .partial()
      .required({ model: true, messages: true }),
    response: z.object({
      id: z.string(),
      object: z.string(),
      created: z.number(),
      model: z.string(),

      choices: z.array(
        z.object({
          index: z.number(),
          message: z.object({
            role: z.string(),
            content: z.string(),
          }),
          finish_reason: z.enum(['stop', 'length']),
        }),
      ),
      usage: z.object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number(),
      }),
    }),
  },
  //* OpenRouter
  openrouter: {
    request: z
      .object({
        model: z.string(),
        prompt: z.string(), //^ should only use one
        messages: z.array(
          //^ that is compatible
          z.object({
            role: z.enum(['user', 'assistant', 'system']),
            name: z.string().optional(),
            content: z.string(),
          }),
        ),

        n: z.number(),
        max_tokens: z.number(),
        temperature: z.number(),
        top_p: z.number(),
        stop: z.array(z.string()),
        presence_penalty: z.number(),
        frequency_penalty: z.number(),
        logit_bias: z.record(z.number()),

        top_k: z.number(),
        user: z.string(),
        transforms: z.array(z.string()),
        stream: z.boolean(),
      })
      .partial()
      .required({ model: true }),
    response: z.object({
      id: z.string(),
      model: z.string(),

      choices: z.array(
        z.object({
          message: z.object({
            role: z.string(),
            content: z.string(),
          }),
          finish_reason: z.string().optional(), //? OpenAI only?
        }),
      ),
      //? probably OpenAI only
      usage: z
        .object({
          prompt_tokens: z.number(),
          completion_tokens: z.number(),
          total_tokens: z.number(),
        })
        .optional(),
    }),
  },
}
