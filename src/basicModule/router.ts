import { EventMessage } from '../types.js'
import { createMessage, getRoutes, Message } from './db.js'
import { context, dbug } from './index.js'
import { admin } from './routes/admin.js'
import { chat } from './routes/chat/chat.js'

const log = dbug('router')

const routeList = [admin, chat]
log(
  'available: %o',
  routeList.map((r) => r.name),
)

// create dynamic/context specific matchers
function match(ctx: typeof context, msg: Message) {
  const matchers = {
    toNick: new RegExp(`^\\s*${ctx.self.nick}[^\\w]`, 'i').test(msg.text),
    adminKeyword: new RegExp(`^${ctx.options.adminKeyword} `, 'i').test(msg.text),
  }

  return matchers as Record<string, boolean>
}

export async function router(message: EventMessage) {
  const msg = await createMessage(message)

  const routes = await getRoutes(msg.server, msg.target)
  const matchers = match(context, msg)

  const matched = routes.map((r) => (matchers[r.match] ? r.route : null)).filter(Boolean)

  if (!matched.length) return log('no match')
  else log('matched: %O', matched)

  const route = routeList.find((r) => r.name === matched[0]) //? handle multiple

  if (typeof route === 'function') route(msg)
  else {
    log('matched: %o', route)
    throw new Error('Invalid route')
  }
}
