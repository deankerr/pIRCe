import type { ActionContext } from '../types.js'
import { z } from 'zod'
import { pabel } from '../lib/api.js'
import { create } from '../lib/file.js'
import { stripInitialKeyword } from '../lib/input.js'
import { getClown } from '../lib/util.js'
import { parseJsonRecord } from '../lib/validate.js'
import { respond } from '../send.js'

export async function image(ctx: ActionContext) {
  try {
    console.log('image handler')
    // combine user and profile prompts
    const userPrompt = stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? '')
    const profilePrompt = ctx.profile.mainPrompt ?? ''
    const prompt = `${userPrompt}, ${profilePrompt}`.trim()

    const parameters = parseJsonRecord(ctx.profile.parameters)
    const model = ctx.model.id
    const payloadRaw = {
      ...parameters,
      model,
      prompt,
    }

    let result: PabelImageResponse | undefined
    if (ctx.platform.id === 'openai') {
      console.log('openai')
      const parsedRequest = schema.openai.request.parse(payloadRaw)
      const response = await pabel('image', { ...parsedRequest, provider: 'openai' })
      result = pabelResponseSchema.parse(response)
    }

    if (ctx.platform.id === 'togetherai') {
      console.log('togetherai')
      const parsedRequest = schema.togetherai.request.parse(payloadRaw)
      const response = await pabel('image', { ...parsedRequest, provider: 'togetherai' })
      result = pabelResponseSchema.parse(response)
    }

    if (ctx.platform.id === 'replicate') {
      console.log('replicate')
      const parsedRequest = schema.replicate.request.parse(payloadRaw)
      const response = await pabel('image', { ...parsedRequest, provider: 'replicate' })
      result = pabelResponseSchema.parse(response)
    }

    console.log('result:', result)
    if (!result) throw new Error('unknown platform')

    //* response error handling
    if (result.error) {
      const { message } = result.error
      if (message.includes('NSFW') || message.includes('safety')) {
        const feedback = `${getClown()} ${ctx.platform.id} sez: ${message} ${getClown()}`
        return await respond.error(ctx, feedback)
      }
    }

    //* file creation
    let fileLabel
    if (result.item.base64) fileLabel = await create.base64ToPNG(result.item.base64)
    if (result.item.url) fileLabel = await create.fetchAndSavePNG(result.item.url)

    if (fileLabel)
      await respond.say(
        ctx,
        `"${userPrompt}" - by ${ctx.message.nick} (${ctx.model.label}) ${fileLabel}`,
      )
  } catch (error) {
    // TODO
    console.log('image error')
    console.log(error)
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

  replicate: {
    // are actually model dependant
    request: z.object({
      model: z.string(),
      prompt: z.string(),
      width: z.string().optional(),
      height: z.string().optional(),
      num_outputs: z.number().optional(),
    }),

    response: z.string().url().array(),
  },
}

const pabelResponseSchema = z.object({
  item: z.object({
    url: z.string().optional(),
    base64: z.string().optional(),
  }),
  error: z.object({ status: z.number(), message: z.string() }).optional(),
})
type PabelImageResponse = z.infer<typeof pabelResponseSchema>
