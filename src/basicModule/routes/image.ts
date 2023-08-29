import { ai } from '../api.js'
import { createTag, getOptions, type Message, type Profile } from '../api/db.js'
import { outputBase64ToImage } from '../api/file.js'
import { command } from '../command.js'
import { logger, randomPick } from '../util.js'

const log = logger.create('image')

export async function image(msg: Message, profile: Profile | null, redirectOutput?: string | null) {
  if (!profile) return log('aborted - invalid profile')
  await createTag(msg, profile.id)

  const result = await ai.image(msg.content, 'b64_json')
  if (!result) return log('dall-e failed')

  if (result.error || !result.content) {
    const message = result.error
      ? `OpenAI sez: ${result.error} ${randomPick(['🤡', '😋', '🤓', '🤣', '🤪', '🤠'])}`
      : 'Unknown error :('
    const target = redirectOutput ? redirectOutput : msg.target
    command.say(target, message, profile.id)
    return
  }

  const { outputFileURLTemplate } = await getOptions()

  const fileID = await outputBase64ToImage(result.content)
  const fileURL = outputFileURLTemplate.replace('%', fileID)

  log('image: %s', fileURL)

  const target = redirectOutput ? redirectOutput : msg.target
  command.say(target, fileURL, profile.id)
}
