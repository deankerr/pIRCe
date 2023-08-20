import { EventMessage } from '../types.js'
import { createMessage, getOptions, getRoutesForTarget } from './db.js'
import { context, dbug } from './index.js'
import { admin } from './routes/admin.js'
import { chat } from './routes/chat/chat.js'

const log = dbug('router')

const verbose = dbug('router:v')
verbose.enabled = false

const handlers = [admin, chat]
const TEMP_adminKeyword = '!!admin!!' // TODO pull from options

// create dynamic matcher tester for this context, return expressions that match
function createContextualMatcher(nick: string) {
  const matchers: Record<string, RegExp> = {
    adminKeyword: new RegExp(`^${TEMP_adminKeyword} `),
    startsWithNick: new RegExp(`^${nick}\\W`),
    includesNick: new RegExp(`\\s${nick}\\W`),
    endsWithNick: new RegExp(`\\s${nick}$`),
  }

  return matchers
}

// export async function router(message: EventMessage) {
//   const msg = await createMessage(message)

//   // don't route our own messages
//   if (msg.self) return

//   // relevant routes
//   const routes = await getRoutesForTarget(msg.server, msg.target)
//   verbose('%o', routes)
//   // regexp tester
//   const contextMatcher = createContextualMatcher(context.self.nick)
//   verbose('%o', contextMatcher)
//   // message matches regexp
//   const matchedRoutes = routes.filter((route) => contextMatcher[route.matcher].test(msg.content))
//   verbose('%o', matchedRoutes)
//   if (!matchedRoutes.length) return
//   else log(matchedRoutes.map((r) => `${r.handler}/${r.chatProfileID}`))

//   // sort by target char length for very approximate specificity
//   const [match] = matchedRoutes.sort(
//     (a, b) => b.target.length + b.server.length - (a.target.length + a.server.length),
//   )

//   // match name to function in list
//   const route = handlers.find((r) => r.name === match.handler)

//   if (typeof route === 'function')
//     route(msg, match.chatProfileID ?? 0, contextMatcher[match.matcher])
//   else {
//     log('matched: %o', route)
//     throw new Error('Invalid route')
//   }
// }

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
    validRoutes.map((r) => `${r.handler}/${r.chatProfileID}`),
  )

  for (const route of validRoutes) {
    const handler = handlers.find((h) => h.name === route.handler)
    if (typeof handler === 'function') handler(msg, route.chatProfileID)
    else log('invalid handler: %O', handler)
  }
}

// startsWithNick: new RegExp(`^${nick}\\W`),
// includesNick: new RegExp(`\\s${nick}\\W`),
//   endsWithNick: new RegExp(`\\s${nick}$`),

function substituteKeywords(content: string, replacers: Record<string, string>) {
  let result = content
  for (const key of Object.keys(replacers)) {
    const k = key as keyof typeof replacers
    result = result.replaceAll(k, replacers[k])
  }

  return result
}
