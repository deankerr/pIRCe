import OpenAI from 'openai'

import type { OpenAIMessage } from '../../types.js'
import { logger } from '../util.js'

const log = logger.create('openAI')

function createBackend() {
  if (process.env.OPENROUTER_API_KEY) {
    log('using OpenRouter API')
    const apiKey = process.env.OPENROUTER_API_KEY
    const baseURL = 'https://openrouter.ai/api/v1'

    const model = process.env.OPENROUTER_API_MODEL
    const referer = process.env.OPENROUTER_YOUR_SITE_URL
    const title = process.env.OPENROUTER_YOUR_APP_NAME

    if (!model) throw new Error('OPENROUTER_API_MODEL not set')
    if (!referer) throw new Error('OPENROUTER_YOUR_SITE_URL not set')
    if (!title) throw new Error('OPENROUTER_YOUR_APP_NAME not set')

    const headers = {
      'HTTP-Referer': referer,
      'X-Title': title,
    }

    return {
      api: new OpenAI({ apiKey, baseURL }),
      model,
      headers,
      backendProvider: 'OpenRouter',
    }
  } else if (process.env.OPENAI_API_KEY) {
    log('using OpenAI API')
    const apiKey = process.env.OPENAI_API_KEY
    const model = process.env.OPENAI_API_MODEL
    if (!model) throw new Error('OPENAI_API_MODEL not set')

    return {
      api: new OpenAI({ apiKey }),
      model,
      headers: {},
      backendProvider: 'OpenAI',
    }
  } else {
    throw new Error('OPENAI_API_KEY or OPENROUTER_API_KEY not set')
  }
}

const { api, model, headers, backendProvider } = createBackend()

export async function moderation(input: string) {
  try {
    if (backendProvider === 'OpenRouter') throw new Error('OpenRouter does not support moderation')
    log(backendProvider, 'moderation')
    const response = await api.moderations.create({ input }, { headers })
    return response.results[0]
  } catch (error) {
    return handleError(error)
  }
}

export async function chat(messages: OpenAIMessage[], max_tokens: number) {
  try {
    log('%s/%s messages: %d', backendProvider, model, messages.length)
    // log('%o', messages)
    const result = await api.chat.completions.create(
      {
        model,
        max_tokens,
        messages,
      },
      { headers },
    )

    const message = result.choices[0].message?.content
    const finishReason = result.choices[0].finish_reason
    const usage = result.usage

    if (!message || !finishReason || !usage) throw new Error('Response missing expected data')

    return { message, finishReason, usage }
  } catch (error) {
    return handleError(error)
  }
}

export async function chatLlama(messages: OpenAIMessage[], max_tokens: number, model: string) {
  try {
    log('%s/%s messages: %d', backendProvider, model, messages.length)
    // log('%o', messages)
    const result = await api.chat.completions.create(
      {
        model,
        max_tokens,
        messages,
        temperature: 0.8,
        presence_penalty: 1.2,
        frequency_penalty: 0.7,
        top_p: 0.4,
        // @ts-dexpect-error Llama models support
        // top_k: 0.6,
      },
      { headers },
    )

    // TODO Proper OpenRouter support errors/options
    // @ts-expect-error stop using this library
    if (result.data?.error) {
      // @ts-expect-error stop using this library
      const { error } = result.data
      log(error)
      const code = error.code
      const errMsg = (error.message as string).replaceAll('\n', '')
      const message = `Received the following garbage: ${code} ${errMsg}`
      return { error: message }
    }

    const message = result.choices[0].message?.content
    if (!message) throw new Error('Response missing expected data')

    return { message }
  } catch (error) {
    return handleError(error)
  }
}

function handleError(error: unknown) {
  if (error instanceof OpenAI.APIError) {
    log(error.status) // e.g. 401
    log(error.message) // e.g. The authentication token you passed was invalid...
    log(error.code) // e.g. 'invalid_api_key'
    log(error.type) // e.g. 'invalid_request_error'
    return null
  } else {
    // Non-API error
    log(error)
    return null
  }
}
