import type { InitialContext } from '../types.js'
import debug from 'debug'
import { prisma } from '../api/db.js'
import { command } from '../command.js'

const log = debug('pIRCe:admin')

// admin commands
export function admin(event: InitialContext) {
  const { message } = event
  const split = message.content.split(' ')
  const cmd = split[1] ?? ''
  const arg = split[2] ?? ''
  const rest = split.slice(3).join(' ')
  log('%s %s', cmd, arg ?? '')

  if (cmd === 'join') command.join(arg)
  if (cmd === 'part') command.part(arg)
  if (cmd === 'action') void command.action(arg, rest, null)
  if (cmd === 'say') void command.say(arg, rest, null)
  if (cmd === 'replay') void replay()
}

async function replay() {
  const lastMsg = await prisma.message.findMany({
    where: {
      self: true,
    },
    take: -1,
  })
  if (lastMsg[0]) {
    const { target, content } = lastMsg[0]
    void command.say(target, content || '(empty replay content)', null)
  } else {
    log('no message to replay')
  }
}
