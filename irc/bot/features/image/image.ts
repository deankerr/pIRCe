import type { Platform } from '@prisma/client'
import type { ActionContext } from '../../types.js'
import debug from 'debug'
import { HTTPError } from 'got'
import { z } from 'zod'
import { respond } from '../../command.js'
import { request } from '../../lib/api.js'
import { create } from '../../lib/file.js'
import { stripInitialKeyword } from '../../lib/input.js'
import { TEMPparseProfileParameters } from '../../lib/validate.js'

const log = debug('pIRCe:image')

export async function image(ctx: ActionContext) {
  try {
    const parameters = TEMPparseProfileParameters(ctx.profile.parameters)
    const payload = {
      ...parameters,
      prompt: stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? ''),
    }

    log(`${ctx.platform.label} ${ctx.model.label} > %o`, payload.prompt)
    const response = await request(ctx.platform, 'image', payload, ctx.options)
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
