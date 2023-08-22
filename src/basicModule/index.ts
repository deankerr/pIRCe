import { db } from './api.js'
import { router } from './router.js'
import { logger } from './util.js'

logger.log('basicModule loaded')
logger.log(await db.getOptions())

process.on('message', router)
