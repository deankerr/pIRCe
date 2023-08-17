import { type Message } from '../../db.js'
import { dbug } from '../../index.js'
import { openAI } from './openAI.js'

const log = dbug('moderation')

export async function moderate(msg: Message) {
  // const { options } = context
  const input = `${msg.nick}: ${msg.content}`
  const result = await openAI.moderation(input)

  if (result === null) return log('no result')
  if ('error' in result) {
    // TODO handle error
    return log('error: %s', result.error)
  }

  // const allowedKeys = options.allowedModerationCategories
  const allowedKeys: string[] = [] // TODO
  const keys = Object.keys(result.categories) as (keyof typeof result.categories)[]
  const reject = keys.filter((k) => result.categories[k] && !allowedKeys.includes(k))

  const allowed = reject.length === 0
  if (!allowed) log('rejected: %s %o', input, reject)

  // return await prisma.message.update({
  //   where: { id: msg.id },
  //   data: {
  //     checked: true,
  //     allowed,
  //   },
  // })
}
