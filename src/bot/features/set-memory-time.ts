import type { InitialContext } from '../types.js'
import debug from 'debug'
import { setMessageMaxHistoryTimeAllNow } from '../lib/db.js'
import { respond } from '../send.js'

const log = debug('pIRCe:user-command')

export async function setMemoryTime(ctx: InitialContext) {
  await setMessageMaxHistoryTimeAllNow()
  log('max message history time updated')
  await respond.action(ctx, 'stares vacantly for a few moments')
}
