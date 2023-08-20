import { getWordList } from './db.js'

const maxNewlines = 3

export async function outputFilter(text: string) {
  // remove excess newlines, concat to one line if above max
  const split = text.split('\n').filter((t) => t !== '')
  const joined = split.length > maxNewlines ? split.join(' ') : split.join('\n')

  let filtered = joined

  const words = await getWordList()
  for (const { word } of words) {
    const regex = new RegExp(`${word}`, 'gi')
    filtered = filtered.replaceAll(regex, '****')
  }

  return filtered
}
