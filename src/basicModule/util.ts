import * as _formatOutput from './util/formatOutput.js'
import * as _logger from './util/logger.js'
import * as _context from './util/self.js'

export { _context as context, _formatOutput as formatOutput, _logger as logger }

export function randomPick<T>(list: T[]) {
  if (list.length < 1) throw new Error('randomPick needs array length of at least 1')
  const n = Math.round(Math.random() * (list.length - 1))
  return list[n]
}
