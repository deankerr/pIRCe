import type { CommandMessage } from '../types.js'
import { outputFilter } from './outputFilter.js'

const send = (message: CommandMessage) => {
  if (!process.send) throw new Error('process.send is unavailable')
  process.send(message)
}

export const command = {
  say: async (target: string, message: string) => {
    send({ say: [target, await outputFilter(message)] })
  },
  action: async (target: string, message: string) => {
    send({ action: [target, await outputFilter(message)] })
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
