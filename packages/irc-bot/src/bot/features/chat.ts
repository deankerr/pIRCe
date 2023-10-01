import type { Message } from '@prisma/client'
import type { ActionContext, AIChatMessage } from '../types.js'
import { z } from 'zod'
import { pabel } from '../lib/api.js'
import { getContextualMessages } from '../lib/db.js'
import { buildOpenChatMessages, normalizeAPIInput } from '../lib/input.js'
import { parseJsonRecord } from '../lib/validate.js'
import { respond } from '../send.js'

export async function chat(ctx: ActionContext) {
  try {
    const contextual = await getContextualMessages(ctx.message, ctx.profile)
    let messages = buildOpenChatMessages(ctx.profile, contextual)

    if (ctx.platform.id === 'openai') {
      const moderated = await moderateMessages(ctx, messages, ctx.message)
      if (!moderated) return console.log('chat failed')
      messages = moderated
    }

    messages = normalizeAPIInput(messages, ctx.handler.triggerWord)
    messages.forEach((m) => console.log('%s: %o', m.name ?? m.role, m.content))

    const parameters = parseJsonRecord(ctx.profile.parameters)
    const model = ctx.model.id
    const payloadRaw = {
      ...parameters,
      model,
      messages,
    }

    let msg: string | undefined
    if (ctx.platform.id === 'openai') {
      const parsedRequest = schema.openai.request.parse(payloadRaw)
      const response = await pabel('chat', { ...parsedRequest, provider: 'openai' })
      if (response && typeof response === 'string') {
        msg = response
      }
    }

    if (ctx.platform.id === 'openrouter') {
      console.log('openrouter')
      const parsedRequest = schema.openrouter.request.parse(payloadRaw)
      const response = await pabel('chat', { ...parsedRequest, provider: 'openrouter' })
      if (response && typeof response === 'string') {
        msg = response
      }
    }

    if (!msg) throw new Error('msg not requested')
    console.log('raw: %o', msg)
    // clean some prompt data that leaks into response, commonly with OpenRouter
    const cleaned = msg
      .replaceAll(new RegExp(`^${ctx.profile.characterName ?? ''}:`, 'gm'), '')
      .replaceAll(/<(human|bot).*$/gm, '')
      .replaceAll(/###.*$/gm, '')
      .replaceAll(/\n\n##/gm, '')
      .trim()

    await respond.say(ctx, cleaned)
  } catch (error) {
    console.log('chat error')
    console.log(error)
  }
}

async function moderateMessages(
  ctx: ActionContext,
  messages: AIChatMessage[],
  userMessage: Message,
) {
  const { moderationProfileList } = ctx.options

  const input = messages.map((m) => `${m.name ?? ''} ${m.content}`)
  const payload = schemaModeration.request.parse({ input })

  const response = await pabel('moderation', payload)
  const parsed = schemaModeration.response.parse(response)

  // get flagged keys, remove allowed, return remaining objectional keys
  const modResults = parsed.results.map((result) => {
    const { categories } = result
    const flaggedKeys = Object.keys(categories).filter((k) => categories[k])
    return flaggedKeys.filter((k) => !moderationProfileList.includes(k))
  })

  let abort = false
  messages.filter((msg, i) => {
    const result = modResults[i]
    if (!result) throw new Error('Invalid moderation result')

    const allowed = result.length === 0

    if (!allowed && msg.role === 'system') {
      console.log('Moderation failed on system prompt: %o', msg.content)
      abort = true
    }

    if (!allowed && msg.content === userMessage.content) {
      console.log('Moderation failed: %o', msg.content)
      abort = true
    }

    return allowed
  })

  return abort ? null : messages
}

//* Schema
const schema = {
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
        // prompt: z.string(), //^ should only use one
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
      .required({ model: true, messages: true }),

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

const schemaModeration = {
  request: z.object({
    input: z.string().or(z.string().array()),
    model: z.optional(z.enum(['text-moderation-stable', 'text-moderation-latest'])),
  }),
  response: z.object({
    id: z.string(),
    model: z.string(),
    results: z.array(
      z.object({
        flagged: z.boolean(),
        categories: z.record(z.boolean()),
        category_scores: z.record(z.number()),
      }),
    ),
  }),
}
