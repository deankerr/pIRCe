import { EventMessage } from '../types.js'
import { admin } from './admin.js'
import { chat } from './chat/chat.js'
import { createMessage, getOptions } from './db.js'
import { logger } from './logger.js'

const log = logger.extend('router')

log('routes: ?')
export async function router(message: EventMessage) {
  const options = await getOptions()
  const msg = await createMessage(message)

  if (msg.text.startsWith(options.adminKeyword)) return admin(msg)
  chat(msg)
}
