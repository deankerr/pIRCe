import type { CommandMessage } from '../types.js'
import { createMessage, createTag } from './api/db.js'
import { context } from './util.js'
import { formatOutput } from './util/formatOutput.js'

const send = (message: CommandMessage) => {
  if (!process.send) throw new Error('process.send is unavailable')
  process.send(message)
}

export const command = {
  say: async (target: string, message: string, tag: string | null) => {
    const msg = await createMessage({
      server: context.server,
      target,
      nick: context.me,
      content: message,
      self: true,
      mask: 'self',
      type: 'message',
    })

    if (tag) createTag(msg, tag)

    send({ say: [target, await formatOutput(message)] })
  },
  action: async (target: string, message: string, tag: string | null) => {
    const msg = await createMessage({
      server: context.server,
      target,
      nick: context.me,
      content: message,
      self: true,
      mask: 'self',
      type: 'action',
    })

    if (tag) createTag(msg, tag)

    send({ action: [target, await formatOutput(message)] })
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
