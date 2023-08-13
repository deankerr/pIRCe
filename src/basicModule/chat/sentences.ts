import { dbug } from '../logger.js'

const log = dbug('sent')

export function sentences(input: string) {
  if (!input) return [``]
  const words = input.trim().split(' ')
  const sentence: string[] = [``]

  for (const word of words) {
    const n = sentence.length - 1
    sentence[n] += ` ${word}`
    if (['.', '?', '!', '\n'].some((p) => word.endsWith(p))) {
      sentence.push(``)
    }
  }

  if (!sentence.at(-1)) sentence.pop()
  return sentence
}

export function logSentenceInfo(input: string) {
  const sen = sentences(input)
  for (const s of sen) {
    const lcount = s.split('').length
    const wcount = s.split(' ').length
    log('%s %d/%d', s, lcount, wcount)
  }
}
