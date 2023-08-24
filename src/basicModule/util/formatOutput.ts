import { getOptions, getWordList } from '../api/db.js'

export async function formatOutput(text: string) {
  let filtered = text

  const words = await getWordList()
  const options = await getOptions()

  for (const { word } of words) {
    const regex = new RegExp(`${word}`, 'gi')
    filtered = filtered.replaceAll(regex, '****')
  }

  // remove newlines
  filtered = filtered.replaceAll('\n', ' ')
  // remove excess whitespace
  filtered = filtered.replaceAll(/\s\s*/g, ' ')

  const sentenceChunks = filtered.match(/[^.!?]+[.!?]+|[^.!?]+$/g)
  if (!sentenceChunks) return filtered

  const lines: string[] = []
  let line = ''

  for (const sentence of sentenceChunks) {
    line += sentence

    if (line.length > options.outputMaxCharsPerLine) {
      lines.push(line.trim())
      line = ''
    }
  }

  if (line !== '') lines.push(line.trim())
  return lines.join('\n')
}
