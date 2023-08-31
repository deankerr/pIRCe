import debug from 'debug'

import { router } from './router.js'
import { getClown } from './util.js'

process.on('message', router)
debug('pIRCe')(`loaded ${getClown()}`)
