import type { MessageEvent } from '../types.js'
import debug from 'debug'
import { ai } from '../api/ai.js'
import { outputBase64ToImage } from '../api/file.js'
import { command } from '../command.js'
import { PLATFORMS } from '../const.js'
import { stripInitialKeyword } from '../util/input.js'

const log = debug('pIRCe:image')

export async function image(event: MessageEvent) {
  try {
    const { message, options, handler } = event

    if (event.handler.profile === null) throw new Error('image: profile is null')
    if (event.handler.profile.model === null) throw new Error('image: model is null')
    // ? Handle request payload construction / response validation here? (payload)
    // ? api handles url + headers (config)

    // TODO validate
    const parameters = JSON.parse(event.handler.profile.parameters) as Record<string, string>
    const { model } = event.handler.profile
    const { platform } = model

    // * Construct payload
    parameters.prompt = stripInitialKeyword(message.content, handler.triggerWord ?? '')

    if (platform.id !== PLATFORMS.openai) {
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
