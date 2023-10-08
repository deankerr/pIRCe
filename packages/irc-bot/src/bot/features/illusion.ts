import type { ActionContext } from '../types.js'
import Jimp from 'jimp'
import { z } from 'zod'
import { pabel } from '../lib/api.js'
import { create } from '../lib/file.js'
import { stripInitialKeyword } from '../lib/input.js'
import { parseJsonRecord } from '../lib/validate.js'
import { respond } from '../send.js'

export async function illusion(ctx: ActionContext) {
  try {
    console.log('illusion handler')

    const input = stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? '')
    const params = parseJsonRecord(ctx.profile.parameters)
    const defaultText = params.defaultText ? [String(params.defaultText)] : ['I LOVE pIRCe']

    // use quoted substrings as text mask values
    const illusionText =
      input.match(/"([^"]*)"/g)?.map((str) => str.replace(/"/g, '')) ?? defaultText
    // remove substrings from image prompt
    const imagePrompt = input.replace(/"([^"]*)"/g, '').trim()
    const profilePrompt = ctx.profile.mainPrompt ?? ''
    const prompt = `${profilePrompt}, ${imagePrompt}`.trim()
    const maskImage = await createIllusionTextMask(illusionText, 'dataUri')

    const payload = {
      image_url: maskImage,
      prompt,
      negative_prompt:
        '(worst quality, poor details:1.4), lowres, (artist name, signature, watermark:1.4), bad-artist-anime, bad_prompt_version2, bad-hands-5, ng_deepnegative_v1_75t',
    }

    const response = await pabel('image/illusion', payload)
    console.log(response)
    const result = pabelResponseSchema.parse(response)

    //* file creation
    const fileLabel = await create.fetchAndSavePNG(result.item)

    if (fileLabel)
      await respond.say(
        ctx,
        `"${imagePrompt}" - by ${ctx.message.nick} (${ctx.model.label}) ${fileLabel}`,
      )
  } catch (error) {
    console.log('illusion error')
    console.log(error)
  }
}

async function createIllusionTextMask(input: string[], outputAs: 'dataUri' | 'file') {
  const font = await Jimp.loadFont('illusion-font.fnt')
  const text = input.join(' ')

  const textHeight = Jimp.measureTextHeight(font, text, 1024)
  // jimp vert align middle appears broken
  const verticalOffset = Math.floor(font.info.size * 0.25)
  const y = 512 - Math.floor(textHeight / 2) - verticalOffset

  const image = new Jimp(1024, 1024, 0xffffffff)
  image.print(
    font,
    0,
    y,
    { text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE },
    1024,
  )

  if (outputAs === 'dataUri') {
    return image.getBase64Async(Jimp.MIME_PNG)
  } else {
    const filepath = await create.generateUUIDFilepath('png', 'illusion-text')
    image.write(filepath, () => console.log('illusion mask created:', filepath))
    return filepath
  }
}

//* Schema
const pabelResponseSchema = z.object({
  item: z.string(),
  error: z.object({ status: z.number(), message: z.string() }).optional(),
})
// type PabelImageResponse = z.infer<typeof pabelResponseSchema>
