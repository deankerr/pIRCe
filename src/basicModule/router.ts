import { EventMessage } from '../types.js'
import { createMessage, getRoutesForTarget } from './db.js'
import { context, dbug } from './index.js'
import { admin } from './routes/admin.js'
import { chat } from './routes/chat/chat.js'

const log = dbug('router')
const verbose = dbug('router:v')

const routeList = [admin, chat]

// create dynamic matcher tester for this context, return expressions that match
function createContextualMatcher(ctx: typeof context) {
  const matchers: Record<string, RegExp> = {
    firstWordIsOurNick: new RegExp(`^\\s*${ctx.self.nick}\\W`, 'i'),
    saidOurNick: new RegExp(`\\W${ctx.self.nick}\\W`, 'i'),
    adminKeyword: new RegExp(`^${ctx.options.adminKeyword} `, 'i'),
  }

  return matchers
}

export async function router(message: EventMessage) {
  const msg = await createMessage(message)

  // relevant routes
  const routes = await getRoutesForTarget(msg.server, msg.target)
  verbose(routes)
  // regexp tester
  const contextMatcher = createContextualMatcher(context)
  verbose(contextMatcher)
  // message matches regexp
  const matchedRoutes = routes.filter((route) => contextMatcher[route.matcher].test(msg.text))
  verbose(matchedRoutes)
  if (!matchedRoutes.length) return
  else log(matchedRoutes.map((r) => `${r.route}/${r.systemProfileID}`))

  // sort by target char length for very approximate specificity
  const [match] = matchedRoutes.sort(
    (a, b) => b.target.length + b.server.length - (a.target.length + a.server.length),
  )

  // match name to function in list
  const route = routeList.find((r) => r.name === match.route)

  if (typeof route === 'function')
    route(msg, match.systemProfileID ?? 0, contextMatcher[match.matcher])
  else {
    log('matched: %o', route)
    throw new Error('Invalid route')
  }
}
