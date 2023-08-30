import { router } from './router.js'
import { logger } from './util.js'

logger.log('basicModule loaded')

process.on('message', router)
