import { Configuration, OpenAIApi, type CreateChatCompletionRequest } from 'openai'

import { dbug } from '../../index.js'

export type OAIChatMessages = CreateChatCompletionRequest['messages']

const log = dbug('openAI')

const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) throw new Error('OPENAI_API_KEY is not set')

const api = new OpenAIApi(new Configuration({ apiKey }))

async function moderation(input: string) {
  try {
    const response = await api.createModeration({ input })
    return response.data.results[0]
  } catch (error) {
    return handleError(error)
  }
}

async function chat(messages: OAIChatMessages, max_tokens: number) {
  try {
    const result = await api.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens,
      messages,
    })

    const message = result.data.choices[0].message?.content
    const finishReason = result.data.choices[0].finish_reason
    const usage = result.data.usage

    if (!message || !finishReason || !usage) throw new Error('Response missing expected data')

    return { message, finishReason, usage }
  } catch (error) {
    return handleError(error)
  }
}

export const openAI = { moderation, chat }

function handleError(error: unknown) {
  log(error)
  return null
}
