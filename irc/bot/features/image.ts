import type { Platform } from '@prisma/client'
import type { ActionContext } from '../types.js'
import debug from 'debug'
import { HTTPError } from 'got'
import { z } from 'zod'
import { request, requestReplicate } from '../lib/api.js'
import { create } from '../lib/file.js'
import { stripInitialKeyword } from '../lib/input.js'
import { parseJsonRecord } from '../lib/validate.js'
import { respond } from '../send.js'

const log = debug('pIRCe:image')

export async function image(ctx: ActionContext) {
  try {
    const prompt = stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? '')
    const payload = createPayload(ctx, { prompt })

    log(`%o`, payload.prompt)
    const response = await request(ctx, 'image', payload)
    const imageData = parseResponseImage(ctx.platform, response)

    const fileLabel = await create.base64ToPNG(imageData)
    if (fileLabel) await respond.say(ctx, fileLabel)
  } catch (error) {
    if (error instanceof HTTPError) {
      // TODO handleable rejections
    }
    log(error)
  }
}

export async function imageReplicate(ctx: ActionContext) {
  try {
    const userPrompt = stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? '')
    const profilePrompt = ctx.profile.mainPrompt ?? ''
    const prompt = `${profilePrompt} ${userPrompt}`.trim()

    const payload = { model: ctx.model.id, prompt }

    log(`rep %o`, payload.prompt)

    const response = await requestReplicate(ctx, 'image', payload)

    const urls = z.string().array().parse(response)
    const url = urls[0]!

    const fileLabel = await create.fetchAndSavePNG(url)
    if (fileLabel) await respond.say(ctx, fileLabel)
  } catch (error) {
    if (error instanceof HTTPError) {
      // TODO handleable rejections
    }
    log(error)
  }
}

function createPayload(ctx: ActionContext, input: object) {
  const parameters = parseJsonRecord(ctx.profile.parameters)
  const model = ctx.model.id

  const payload = {
    ...parameters,
    model,
    ...input,
  }

  if (!(ctx.platform.id in schema)) throw new Error(`Unknown platform id: ${ctx.platform.id}`)
  const s = schema[ctx.platform.id as keyof typeof schema].request

  return s.parse(payload)
}

function parseResponseImage(platform: Platform, response: unknown) {
  if (!(platform.id in schema)) throw new Error(`Unknown platform id: ${platform.id}`)
  const s = schema[platform.id as keyof typeof schema].response
  const parsed = s.parse(response)

  let img

  if ('data' in parsed) {
    img = parsed.data[0]?.b64_json
  } else if ('output' in parsed) {
    img = parsed.output.choices[0]?.image_base64
  }

  if (!img) throw new Error('unable to get image data')
  return img
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
