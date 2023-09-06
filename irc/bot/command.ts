import { createMessage } from './api/db.js'
import { formatOutput } from './lib/output.js'
import { self } from './util.js'

const send = (message: string) => {
  if (!process.send) throw new Error('process.send is unavailable')
  process.send(message)
}

export const command = {
  say: async (target: string, message: string) => {
    const msg = await createMessage({
      server: self.server,
      target,
      nick: self.nick,
      content: message,
      self: true,
      mask: 'self',
      type: 'message',
    })
    send(`say ${target} ${await formatOutput(message)}`)
    return msg
  },

  action: async (target: string, message: string) => {
    const msg = await createMessage({
      server: self.server,
      target,
      nick: self.nick,
      content: message,
      self: true,
      mask: 'self',
      type: 'action',
    })
    send(`action ${target} ${await formatOutput(message)}`)
    return msg
  },

  join: (target: string) => {
    send(`join ${target}`)
  },

  part: (target: string) => {
    send(`part ${target}`)
  },
}
