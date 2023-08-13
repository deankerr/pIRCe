import type { Message } from './db.js'
import { sendCommand } from './index.js'

export async function admin(msg: Message) {
  // admin commands
  const [_trigger, command, arg, ...rest] = msg.text.split(' ')
  if (command === 'join') sendCommand.join(arg)
  if (command === 'part') sendCommand.part(arg)
  if (command === 'quit') sendCommand.quit([arg, ...rest].join(' '))
  if (command === 'action') sendCommand.action(arg, rest.join(' '))
  if (command === 'say') sendCommand.say(arg, rest.join(' '))
  if (command === 'info') sendCommand.info()
}
