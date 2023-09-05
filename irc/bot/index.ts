import type { EventMessage } from './types.js'
import debug from 'debug'
import { router } from './router.js'
import { getClown } from './util.js'

process.on('message', (message: EventMessage) => void router(message))
debug('pIRCe')(`bot loaded! ${getClown()}`)
