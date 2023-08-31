import { EventMessage } from '../types.js'
import { createMessage, getChatModel, getOptions, getRoutesForTarget } from './api/db.js'
import { admin } from './routes/admin.js'
import { chatNext } from './routes/chatNext.js'
import { image } from './routes/image.js'
import { context, logger } from './util.js'

const log = logger.create('router')

const handlers = {
  chatNext,
  image,
  admin,
}

export async function router(message: EventMessage) {
  const msg = await createMessage(message)

  // don't route our own messages
  if (msg.self) return

  const options = await getOptions()

  // relevant routes
  const routes = await getRoutesForTarget(msg.server, msg.target)

  const keywords = { '{{nick}}': context.me, '{{admin}}': options.adminKeyword }

  const validRoutes = routes.filter((route) => {
    if (route.startsWith !== null && route.startsWith !== '') {
      const keyword = substituteKeywords(route.startsWith, keywords)
      if (msg.content.startsWith(keyword + ' ')) return true
    }

    if (route.contains !== null && route.contains !== '') {
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

  if (validRoutes.length > 0) {
    log(
      'matched: %O',
      validRoutes.map((r) => `${r.handler}/${r.profileID}`),
    )
  }

  // TODO figure this out
  for (const route of validRoutes) {
    if (route.handler === 'admin') return admin(msg)
    if (route.handler === 'image') return handlers.image({ route, message: msg, options })

    const { profile } = route
    const chatModel = profile?.chatModelID ? await getChatModel(profile.chatModelID) : null

    if (profile && chatModel) {
      const botEvent = {
        route,
        profile,
        chatModel,
        message: msg,
        options,
      }
      handlers.chatNext(botEvent)
    } else {
      log('invalid route: handler %o profile %o chatModel: %o', route.handler, profile, chatModel)
    }
  }
}

// TODO figure this out
function substituteKeywords(content: string, replacers: Record<string, string>) {
  let result = content
  for (const key of Object.keys(replacers)) {
    const k = key as keyof typeof replacers
    result = result.replaceAll(k, replacers[k])
  }

  return result
}
