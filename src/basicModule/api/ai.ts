import { isAxiosError } from 'axios'
import { Configuration, OpenAIApi, type CreateChatCompletionRequest } from 'openai'

import { logger } from '../util.js'

export type OAIChatMessages = CreateChatCompletionRequest['messages']

const log = logger.create('openAI')

function createBackend() {
  if (process.env.OPENROUTER_API_KEY) {
    log('using OpenRouter API')
    const apiKey = process.env.OPENROUTER_API_KEY
    const basePath = 'https://openrouter.ai/api/v1'

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
      api: new OpenAIApi(new Configuration({ apiKey, basePath })),
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
      api: new OpenAIApi(new Configuration({ apiKey })),
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
    const response = await api.createModeration({ input }, { headers })
    return response.data.results[0]
  } catch (error) {
    return handleError(error)
  }
}

export async function chat(messages: OAIChatMessages, max_tokens: number) {
  try {
    log('%s/%s messages: %d', backendProvider, model, messages.length)
    // log('%o', messages)
    const result = await api.createChatCompletion(
      {
        model,
        max_tokens,
        messages,
      },
      { headers },
    )

    const message = result.data.choices[0].message?.content
    const finishReason = result.data.choices[0].finish_reason
    const usage = result.data.usage

    if (!message || !finishReason || !usage) throw new Error('Response missing expected data')

    return { message, finishReason, usage }
  } catch (error) {
    return handleError(error)
  }
}

function handleError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response) {
      const { status, statusText, data } = error.response
      log('Error Response:', status, statusText, data)
      return null
    }
  }
  log(error)
  return null
}
