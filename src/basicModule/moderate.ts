import { Options } from '@prisma/client'

import { createTag, type Message } from './db.js'
import { dbug } from './index.js'
import { openAI } from './routes/chat/openAI.js'

const log = dbug('moderation')

export async function moderate(msg: Message, options: Options) {
  if (options.requireModeration === false) return true

  const input = `${msg.nick}: ${msg.content}`
  log('mod: %s', input)
  const result = await openAI.moderation(input)

  if (result === null) {
    log('moderation failed: no result')
    return false
  }

  const allowedKeys = options.allowModCategories.split(',')
  const keys = Object.keys(result.categories) as (keyof typeof result.categories)[]
  const categories = keys.filter((k) => result.categories[k])
  const filtered = categories.filter((c) => !allowedKeys.includes(c))
  const ignored = categories.filter((c) => allowedKeys.includes(c))

  const allowedResult = filtered.length === 0

  if (allowedResult) {
    log('allow %s', ignored.length > 0 ? `(ignoring categories)` : '')
  } else {
    log('reject %o', filtered)
    createTag(msg, 'moderation', 'reject')
  }

  return allowedResult
}
