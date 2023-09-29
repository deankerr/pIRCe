import type { InitialContext } from '../types.js'
import debug from 'debug'
import { prisma } from '../lib/db.js'
import { sendRaw } from '../send.js'

const log = debug('pIRCe:admin')

// admin commands
export function admin(event: InitialContext) {
  const { message } = event
  const split = message.content.split(' ')
  const cmd = split[1] ?? ''
  const arg = split[2] ?? ''
  const rest = split.slice(3).join(' ')
  log('%s %s', cmd, arg ?? '')

  if (cmd === 'join') void sendRaw.join(arg)
  if (cmd === 'part') void sendRaw.part(arg)
  if (cmd === 'action') void sendRaw.action(arg, rest)
  if (cmd === 'say') void sendRaw.say(arg, rest)
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
    void sendRaw.say(target, content || '(empty replay content)')
  } else {
    log('no message to replay')
  }
}
