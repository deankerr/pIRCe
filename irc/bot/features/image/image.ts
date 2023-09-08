import type { ActionContext } from '../../types.js'
import debug from 'debug'
import { create } from '../../api/file.js'
import { command } from '../../command.js'
import { PLATFORM } from '../../const.js'
import { stripInitialKeyword } from '../../lib/input.js'
import { TEMPparseProfileParameters } from '../../lib/validate.js'
import { apiImage } from './api.js'

const log = debug('pIRCe:image')

export async function image(ctx: ActionContext) {
  try {
    const { message, options, handler, profile, model, platform } = ctx

    const parsed = TEMPparseProfileParameters(profile.parameters)
    // * Construct payload
    const parameters = {
      ...parsed,
      prompt: stripInitialKeyword(message.content, handler.triggerWord ?? ''),
    }

    if (platform.id !== PLATFORM.openai) {
      parameters.model = model.id
    }

    // ? move to specialised per platform modules?
    // ? e.g. OpenAI doesnt take model param, Together does

    const result = await apiImage(platform, parameters, options)
    if (result instanceof Error) throw result
    if ('error' in result && !result.result) return log(result.error)

    // TODO handle content rejection messages

    const fileLabel = await create.base64ToPNG(result.result)

    if (fileLabel) {
      const target = handler.overrideOutputTarget ?? message.target
      void command.say(target, fileLabel)
    }
  } catch (error) {
    log(error)
  }
}
