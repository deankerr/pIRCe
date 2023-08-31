import type { Message } from '@prisma/client'

import { prisma } from '../api/db.js'
import { command } from '../command.js'
import { logger } from '../util.js'

const log = logger.create('admin')

// admin commands
export async function admin(message: Message) {
  const [_trigger, cmd, arg, ...rest] = message.content.split(' ')
  log('%s %s', cmd, arg || '')

  if (cmd === 'join') command.join(arg)
  if (cmd === 'part') command.part(arg)
  if (cmd === 'quit') command.quit([arg, ...rest].join(' '))
  if (cmd === 'action') command.action(arg, rest.join(' '), null)
  if (cmd === 'say') command.say(arg, rest.join(' '), null)
  if (cmd === 'info') command.info()
  if (cmd === 'replay') replay()
}

async function replay() {
  const lastMsg = await prisma.message.findMany({
    where: {
      self: true,
    },
    take: -1,
  })
  if (lastMsg) {
    const { target, content } = lastMsg[0]
    command.say(target, content || '(empty replay content)', null)
  } else {
    log('no message to replay')
  }
}
