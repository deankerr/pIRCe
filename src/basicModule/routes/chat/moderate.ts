import { createTag, type Message } from '../../db.js'
import { dbug } from '../../index.js'
import { openAI } from './openAI.js'

const log = dbug('moderation')

export async function moderate(msg: Message, allowedCategories = '') {
  const input = `${msg.nick}: ${msg.content}`
  log('mod: %s', input)
  const result = await openAI.moderation(input)

  if (result === null) return log('moderation failed: no result')

  const allowedKeys = allowedCategories.split(',')
  const keys = Object.keys(result.categories) as (keyof typeof result.categories)[]
  const categories = keys.filter((k) => result.categories[k])
  const filtered = categories.filter((c) => !allowedKeys.includes(c))
  const ignored = categories.filter((c) => allowedKeys.includes(c))

  const allowedResult = filtered.length === 0

  if (allowedResult) {
    log('allowed %s', ignored.length > 0 ? `(ignoring categories)` : '')
  } else {
    log('rejected %o', filtered)
  }

  createTag(msg, 'moderation', `${allowedResult}`)
  return allowedResult
}
