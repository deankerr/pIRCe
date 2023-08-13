import { log } from './logger.js'
import { router } from './router.js'

export * from './logger.js'
export * from './context.js'
export * from './command.js'

log('basicModule loaded')
process.on('message', router)
