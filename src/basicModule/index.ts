import { log } from './logger.js'
import { router } from './router.js'

log('basicModule loaded')
process.on('message', router)
