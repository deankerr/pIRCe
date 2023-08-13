import { EventMessage } from '../types.js'
import { admin } from './admin.js'
import { chat } from './chat/chat.js'
import { createMessage } from './db.js'
import { context } from './index.js'
import { logger } from './logger.js'

const log = logger.extend('router')

log('routes: ?')
export async function router(message: EventMessage) {
  const { options } = context
  const msg = await createMessage(message)

  if (msg.text.startsWith(options.adminKeyword)) return admin(msg)
  chat(msg)
}
