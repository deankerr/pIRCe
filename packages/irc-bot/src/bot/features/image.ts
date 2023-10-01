import type { ActionContext } from '../types.js'
import { HTTPError } from 'got'
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

    let result: { url?: string; base64?: string } | undefined
    if (ctx.platform.id === 'openai') {
      console.log('openai')
      const parsedRequest = schema.openai.request.parse(payloadRaw)
      const response = await pabel('image', { ...parsedRequest, provider: 'openai' })
      result = schema.pabel.response.parse(response)
    }

    if (ctx.platform.id === 'togetherai') {
      console.log('togetherai')
      const parsedRequest = schema.togetherai.request.parse(payloadRaw)
      const response = await pabel('image', { ...parsedRequest, provider: 'togetherai' })
      result = schema.pabel.response.parse(response)
    }

    if (ctx.platform.id === 'replicate') {
      console.log('replicate')
      const parsedRequest = schema.replicate.request.parse(payloadRaw)
      const response = await pabel('image', { ...parsedRequest, provider: 'replicate' })
      result = schema.pabel.response.parse(response)
    }

    if (!result) throw new Error('invalid response')

    console.log('result:', result)
    let fileLabel
    if (result.base64) fileLabel = await create.base64ToPNG(result.base64)
    if (result.url) fileLabel = await create.fetchAndSavePNG(result.url)

    if (fileLabel)
      await respond.say(
        ctx,
        `"${userPrompt}" - by ${ctx.message.nick} (${ctx.model.label}) ${fileLabel}`,
      )
  } catch (error) {
    // NSFW content rejection errors
    if (error instanceof HTTPError && ctx.platform.id === 'openai') {
      await handleOpenAiError(ctx, error)
    } else if (error instanceof Error && ctx.platform.id === 'replicate') {
      await handleReplicateError(ctx, error)
    }
  }
}

//   if (!(ctx.platform.id in schema)) throw new Error(`Unknown platform id: ${ctx.platform.id}`)
//   const s = schema[ctx.platform.id as keyof typeof schema].request

//   return s.parse(payload)
// }

// function parseResponseImageData(platform: Platform, response: unknown) {
//   if (!(platform.id in schema)) throw new Error(`Unknown platform id: ${platform.id}`)
//   const s = schema[platform.id as keyof typeof schema].response
//   const parsed = s.parse(response)

//   // todo be better
//   if ('data' in parsed) {
//     const b64 = parsed.data[0]?.b64_json
//     if (!b64) throw new Error('unable to get image data')
//     return { b64 }
//   } else if ('output' in parsed) {
//     const b64 = parsed.output.choices[0]?.image_base64
//     if (!b64) throw new Error('unable to get image data')
//     return { b64 }
//   } else if (Array.isArray(parsed)) {
//     const url = parsed[0]
//     if (!url) throw new Error('unable to get image data')
//     return { url }
//   }

//   throw new Error('unable to get image data')
// }

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

  pabel: {
    response: z.object({
      url: z.string().optional(),
      base64: z.string().optional(),
    }),
  },
}

async function handleOpenAiError(ctx: ActionContext, error: HTTPError) {
  try {
    const json = parseJsonRecord(error.response.body)
    const body = z
      .object({
        error: z.object({
          code: z.string(),
          message: z.string(),
        }),
      })
      .parse(json)

    if (body && body.error.code === 'content_policy_violation') {
      const message = `${getClown()} OpenAI sez: ${body.error.message} ${getClown()}`
      await respond.error(ctx, message)
    }
  } catch {
    return
  }
}

async function handleReplicateError(ctx: ActionContext, error: Error) {
  if (error.message.includes('NSFW')) {
    const message = `${getClown()} Replicate sez: ${error.message} ${getClown()}`
    await respond.error(ctx, message)
  }
}
