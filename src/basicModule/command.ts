import type { CommandMessage } from '../types.js'
import { outputFilter } from './chat/outputFilter.js'

const send = (message: CommandMessage) => {
  if (!process.send) throw new Error('process.send is unavailable')
  process.send(message)
}

export const command = {
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
