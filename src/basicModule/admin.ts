import { command } from './command.js'
import type { Message } from './db.js'

export async function admin(msg: Message) {
  // admin commands
  const [_trigger, cmd, arg, ...rest] = msg.text.split(' ')
  if (cmd === 'join') command.join(arg)
  if (cmd === 'part') command.part(arg)
  if (cmd === 'quit') command.quit([arg, ...rest].join(' '))
  if (cmd === 'action') command.action(arg, rest.join(' '))
  if (cmd === 'say') command.say(arg, rest.join(' '))
  if (cmd === 'info') command.info()
}
