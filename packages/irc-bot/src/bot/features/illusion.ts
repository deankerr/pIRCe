import type { ActionContext } from '../types.js'
import { z } from 'zod'
import { pabel } from '../lib/api.js'
import { create } from '../lib/file.js'
import { stripInitialKeyword } from '../lib/input.js'
import { getClown } from '../lib/util.js'
import { parseJsonRecord } from '../lib/validate.js'
import { respond } from '../send.js'

export async function illusion(ctx: ActionContext) {
  try {
    console.log('illusion handler')

    const userPrompt = stripInitialKeyword(ctx.message.content, ctx.handler.triggerWord ?? '')
    const profilePrompt = ctx.profile.mainPrompt ?? ''
    const prompt = `${profilePrompt}, ${userPrompt}`.trim()

    const parameters = parseJsonRecord(ctx.profile.parameters)
    const payload = {
      ...parameters,
      prompt,
      negative_prompt:
        '(worst quality, poor details:1.4), lowres, (artist name, signature, watermark:1.4), bad-artist-anime, bad_prompt_version2, bad-hands-5, ng_deepnegative_v1_75t',
    }

    const response = await pabel('image/illusion', payload)
    console.log(response)
    const result = pabelResponseSchema.parse(response)

    //* response error handling
    if (result.error) {
      const { message } = result.error
      if (message.includes('NSFW') || message.includes('safety')) {
        const feedback = `${getClown()} ${ctx.platform.id} sez: ${message} ${getClown()}`
        return await respond.error(ctx, feedback)
      }
    }

    //* file creation
    let fileLabel
    if (result.base64) fileLabel = await create.base64ToPNG(result.base64)
    if (result.url) fileLabel = await create.fetchAndSavePNG(result.url)

    if (fileLabel)
      await respond.say(
        ctx,
        `"${userPrompt}" - by ${ctx.message.nick} (${ctx.model.label}) ${fileLabel}`,
      )
  } catch (error) {
    console.log('illusion error')
    console.log(error)
  }
}

//* Schema
const pabelResponseSchema = z.object({
  url: z.string().optional(),
  base64: z.string().optional(),
  error: z.object({ status: z.number(), message: z.string() }).optional(),
})
// type PabelImageResponse = z.infer<typeof pabelResponseSchema>
