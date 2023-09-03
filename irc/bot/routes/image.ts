import debug from 'debug'

import { ai } from '../api/ai.js'
import { getImageModel } from '../api/db.js'
import { outputBase64ToImage } from '../api/file.js'
import { command } from '../command.js'
import type { BotEvent } from '../types.js'
import { getClown } from '../util.js'

const log = debug('pIRCe:image')

// currently the only option
const modelID = 'openai.dalle'

export async function image(botEvent: BotEvent) {
  try {
    const { route, options } = botEvent

    const imageModel = await getImageModel(modelID)
    const result = await ai.image({ ...botEvent, imageModel })
    if (result instanceof Error) throw result

    if ('error' in result && !result.result) {
      const msg = `OpenAI sez: ${result.error} ${getClown()}`
      const target = route.redirectOutput ?? botEvent.message.target
      command.say(target, msg, null)
      return
    }

    const { outputFileURLTemplate } = options
    const fileID = await outputBase64ToImage(result.result)
    const fileURL = outputFileURLTemplate.replace('%', fileID)

    log('image: %s', fileURL)

    const target = route.redirectOutput ?? botEvent.message.target
    command.say(target, fileURL, null)
  } catch (error) {
    log('failed.')
  }
}
