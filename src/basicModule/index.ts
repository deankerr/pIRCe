import type { CommandMessage, EventMessage } from '../types.js'
import { admin } from './admin.js'
import { chat } from './chat/chat.js'
import { outputFilter } from './chat/outputFilter.js'
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

const send = (message: CommandMessage) => {
  if (!process.send) throw new Error('process.send is unavailable')
  process.send(message)
}

export const sendCommand = {
  say: (target: string, message: string) => {
    send({ say: [target, outputFilter(message)] })
  },
  action: (target: string, message: string) => {
    send({ action: [target, outputFilter(message)] })
  },
  join: (target: string) => {
    send({ join: target })
  },
  part: (target: string) => {
    send({ part: target })
  },
  quit: (message: string) => {
    send({ quit: message })
  },
  info: () => {
    send({ info: true })
  },
}

async function init() {
  log('init')
  process.on('message', router)
}

init()
