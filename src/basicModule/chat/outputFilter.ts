import { getOptions } from '../db.js'

const options = await getOptions()

const maxNewlines = 3

export function outputFilter(text: string) {
  // remove excess newlines, concat to one line if above max
  const split = text.split('\n').filter((t) => t !== '')
  const joined = split.length > maxNewlines ? split.join(' ') : split.join('\n')

  let filtered = joined

  for (const word of options.outputWordFilterList) {
    const regex = new RegExp(`${word}`, 'gi')
    filtered = filtered.replace(regex, '****')
  }

  return filtered
}
