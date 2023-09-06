import type { InitialContext } from '../types.js'
import debug from 'debug'
import { ai } from '../api/ai.js'
import { outputBase64ToImage } from '../api/file.js'
import { command } from '../command.js'
import { PLATFORM } from '../const.js'
import { stripInitialKeyword } from '../lib/input.js'
import { validateActionContext } from '../lib/validate.js'

const log = debug('pIRCe:image')

export async function image(event: InitialContext) {
  try {
    const ctx = validateActionContext(event)
    if (ctx instanceof Error) return log('failed')

    const { message, options, handler, profile, model, platform } = ctx

    // ? Handle request payload construction / response validation here? (payload)
    // ? api handles url + headers (config)

    // * Construct payload
    const parameters = {
      ...profile.parameters,
      prompt: stripInitialKeyword(message.content, handler.triggerWord ?? ''),
    }

    if (platform.id !== PLATFORM.openai) {
      parameters.model = model.id
    }

    // ? move to specialised per platform modules?
    // ? e.g. OpenAI doesnt take model param, Together does

    const result = await ai.image(platform, parameters, options)
    if (result instanceof Error) throw result
    if ('error' in result && !result.result) return log(result.error)
    // if ('error' in result && !result.result) {
    //   const msg = `OpenAI sez: ${result.error} ${getClown()}`
    //   const target = route.overrideOutputTarget ?? botEvent.message.target
    //   void command.say(target, msg, null)
    //   return
    // }

    // TODO encapsulate this + long text function
    const { outputFileURLTemplate } = options
    const fileID = await outputBase64ToImage(result.result)
    const fileURL = outputFileURLTemplate.replace('%', fileID)

    log('image: %s', fileURL)

    const target = handler.overrideOutputTarget ?? message.target
    void command.say(target, fileURL, null)
  } catch (error) {
    log(error)
  }
}

// function createImageEvent(botEvent: BotEvent): ImageEvent {
//   if ('model' in botEvent.route) {
//     const model = botEvent.route.model as Model
//     return { ...botEvent, model }
//   } else {
//     log(botEvent)
//     throw new Error('BotEvent missing model')
//   }
// }
