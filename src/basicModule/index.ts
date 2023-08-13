import type { EventMessage } from '../types.js'
import { admin } from './admin.js'
import { chat } from './chat/chat.js'
import { createMessage, getOptions } from './db.js'
import { log } from './logger.js'

const options = await getOptions()

async function router(message: EventMessage) {
  try {
    const msg = await createMessage(message)
    if (msg.text.startsWith(options.adminKeyword)) return admin(msg)
    chat(msg)
  } catch (error) {
    log('dbmodule main error', error)
  }
}

async function init() {
  log('init')
  process.on('message', router)
}

init()
