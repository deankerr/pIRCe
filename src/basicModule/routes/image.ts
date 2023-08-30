import { ai } from '../api.js'
import { createTag, getOptions, prisma, type Message, type Profile } from '../api/db.js'
import { outputBase64ToImage } from '../api/file.js'
import { command } from '../command.js'
import { logger, randomPick } from '../util.js'

const log = logger.create('image')

export async function image(msg: Message, profile: Profile | null, redirectOutput?: string | null) {
  if (!profile) return log('aborted - invalid profile')
  const tag = await createTag(msg, profile.id)

  const result = await ai.image(msg.content.replace(/^@\w*\s/, ''), 'b64_json')
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

  // ! Temp - log image prompts/filenames
  const tagLog = {
    nick: msg.nick,
    prompt: msg.content,
    fileID,
  }

  await prisma.tag.update({ where: { id: tag.id }, data: { value: JSON.stringify(tagLog) } })
}
