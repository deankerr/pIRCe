import { EventMessage } from '../types.js'
import { createMessage, getOptions, getRoutesForTarget } from './db.js'
import { context, dbug } from './index.js'
import { admin } from './routes/admin.js'
import { chat } from './routes/chat/chat.js'

const log = dbug('router')

const handlers = [admin, chat]

export async function router(message: EventMessage) {
  const msg = await createMessage(message)

  // don't route our own messages
  if (msg.self) return

  const options = await getOptions()

  // relevant routes
  const routes = await getRoutesForTarget(msg.server, msg.target)

  const keywords = { '{{nick}}': context.self.nick, '{{admin}}': options.adminKeyword }

  const validRoutes = routes.filter((route) => {
    if (route.startsWith !== null) {
      const keyword = substituteKeywords(route.startsWith, keywords)
      if (msg.content.startsWith(keyword + ' ')) return true
    }

    if (route.contains !== null) {
      const keyword = substituteKeywords(route.contains, keywords)
      const tests = [
        new RegExp(`^${keyword}[.,!?:;\\s]`), // starts with
        new RegExp(`\\s${keyword}[.,!?:;\\s]`), // includes
        new RegExp(`\\s${keyword}$`), // ends with
        new RegExp(`^${keyword}$`), // is only
      ]

      if (tests.some((t) => t.test(msg.content))) return true
    }

    return false
  })

  log(
    'matched: %O',
    validRoutes.map((r) => `${r.handler}/${r.profileID}`),
  )

  for (const route of validRoutes) {
    const handler = handlers.find((h) => h.name === route.handler)
    if (typeof handler === 'function') handler(msg, route.profile)
    else log('invalid handler: %O', handler)
  }
}

function substituteKeywords(content: string, replacers: Record<string, string>) {
  let result = content
  for (const key of Object.keys(replacers)) {
    const k = key as keyof typeof replacers
    result = result.replaceAll(k, replacers[k])
  }

  return result
}
