import { EventMessage } from '../types.js'
import { createMessage, getRoutes, Message } from './db.js'
import { context, dbug } from './index.js'
import { admin } from './routes/admin.js'
import { chat } from './routes/chat/chat.js'

const log = dbug('router')

const realroutes = [admin, chat]

// const matchers = {
//   toNick: new RegExp(`^\\s*${ctx.self.nick}[^\\w]`, 'i'),
//   adminKeyword: new RegExp(`^${msg.text} `, 'i'),
// }

function match(ctx: typeof context, msg: Message) {
  const matchers = {
    toNick: new RegExp(`^\\s*${ctx.self.nick}[^\\w]`, 'i').test(msg.text),
    adminKeyword: new RegExp(`^${ctx.options.adminKeyword} `, 'i').test(msg.text),
  }

  return matchers as Record<string, boolean>
}

log('routes: TODO ?')
export async function router(message: EventMessage) {
  const msg = await createMessage(message)

  const routes = await getRoutes(msg.server, msg.target)
  log('got routes: %o', routes)
  const matchers = match(context, msg)
  log('matchers: %o', matchers)

  const routematch = routes.map((r) => (matchers[r.match] ? r.route : null)).filter(Boolean)
  log('results %o', routematch)
  // TODO abort if none

  const theroute = realroutes.find((r) => r.name === routematch[0])

  if (theroute) {
    log('ROUTE: %s', theroute.name)
    theroute(msg)
  } else {
    log('No Route Found')
  }
}
