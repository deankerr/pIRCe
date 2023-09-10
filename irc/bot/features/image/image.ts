import type { ActionContext } from '../../types.js'
import debug from 'debug'
import { respond } from '../../command.js'
import { reqAPI } from '../../lib/api.js'
import { create } from '../../lib/file.js'
import { stripInitialKeyword } from '../../lib/input.js'
import { TEMPparseProfileParameters } from '../../lib/validate.js'
import { apiImage } from './api.js'

const log = debug('pIRCe:image')

export async function image(ctx: ActionContext) {
  try {
    await image2(ctx)
    const { message, options, handler, profile, platform } = ctx

    const parsed = TEMPparseProfileParameters(profile.parameters)
    // * Construct payload
    const parameters = {
      ...parsed,
      prompt: stripInitialKeyword(message.content, handler.triggerWord ?? ''),
    }

    const result = await apiImage(platform, parameters, options)
    if (result instanceof Error) throw result
    if ('error' in result && !result.result) return log(result.error)

    // TODO handle content rejection messages

    const fileLabel = await create.base64ToPNG(result.result)

    if (fileLabel) {
      await respond.say(ctx, fileLabel)
    }
  } catch (error) {
    log(error)
  }
}

export async function image2(ctx: ActionContext) {
  const parameters = TEMPparseProfileParameters(ctx.profile.parameters)
  const payload = {
    ...parameters,
    prompt: stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? ''),
  }

  await reqAPI.image(ctx.platform, payload, ctx.options)
}
