import type { InitialContext } from '../types.js'
import { setMessageMaxHistoryTimeAllNow } from '../lib/db.js'
import { respond } from '../send.js'

export async function setMemoryTime(ctx: InitialContext) {
  await setMessageMaxHistoryTimeAllNow()
  console.log('max message history time updated')
  await respond.action(ctx, 'stares vacantly for a few moments')
}
