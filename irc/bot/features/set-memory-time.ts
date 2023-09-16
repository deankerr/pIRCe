import type { InitialContext } from '../types.js'
import debug from 'debug'
import { setMessageMaxHistoryTimeAllNow } from '../lib/db.js'

const log = debug('pIRCe:user-command')

export async function setMemoryTime(_event: InitialContext) {
  await setMessageMaxHistoryTimeAllNow()
  log('max message history time updated')
}
