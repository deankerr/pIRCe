import { EventMessage } from '../types.js'
import { createMessage, getAllRoutes, getRoutesForTarget, Message } from './db.js'
import { context, dbug } from './index.js'
import { admin } from './routes/admin.js'
import { chat } from './routes/chat/chat.js'

const log = dbug('router')

log('routes table: %O', await getAllRoutes())

const routeList = [admin, chat]
log(
  'route functions: %o',
  routeList.map((r) => r.name),
)

// create dynamic/context specific matchers
function createMatchers(ctx: typeof context, msg: Message) {
  const matchers = {
    toNick: new RegExp(`^\\s*${ctx.self.nick}[^\\w]`, 'i').test(msg.text),
    adminKeyword: new RegExp(`^${ctx.options.adminKeyword} `, 'i').test(msg.text),
  }

  return matchers as Record<string, boolean>
}

export async function router(message: EventMessage) {
  const msg = await createMessage(message)

  const routes = await getRoutesForTarget(msg.server, msg.target)
  const matchers = createMatchers(context, msg)

  const matchedRoutes = routes
    .map((route) => (matchers[route.matcher] ? route : null))
    .filter(Boolean)

  if (!matchedRoutes.length) return log('no match')
  else log('matched: %O', matchedRoutes)

  // sort by target char length for very approximate specificity
  const [match] = matchedRoutes.sort(
    (a, b) => b.target.length + b.server.length - (a.target.length + a.server.length),
  )

  const route = routeList.find((r) => r.name === match.route)

  if (typeof route === 'function') route(msg, match.systemProfileID ?? 0)
  else {
    log('matched: %o', route)
    throw new Error('Invalid route')
  }
}
