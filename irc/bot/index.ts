import type { IRCEventMessage } from './types.js'
import debug from 'debug'
import { router } from './router.js'
import { getClown } from './util.js'

process.on('message', (message: IRCEventMessage) => void router(message))
debug('pIRCe')(`bot loaded! ${getClown()}`)
