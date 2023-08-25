import { getOptions, getWordList } from '../api/db.js'
import { outputToIDFile } from '../api/file.js'
import { create } from './logger.js'

const log = create('output')

const maxNewlinesPerResponse = 3

export async function formatOutputO(text: string) {
  const fileID = outputToIDFile(text)
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

  const sentenceChunks = filtered.match(/[^.!?"]*[.!?"]+|[^.!?"]+$/g)
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

  log(lines)

  if (lines.length > 2)
    return lines.slice(0, 2).join('\n') + ` ${options.outputFileBaseURL}${fileID}`
  else return lines.join('\n')
}

export async function formatOutput(text: string) {
  let filtered = text

  const words = await getWordList()
  const options = await getOptions()

  for (const { word } of words) {
    const regex = new RegExp(`${word}`, 'gi')
    filtered = filtered.replaceAll(regex, '****')
  }

  // split any newlines, remove blanks
  const nsplit = filtered.split('\n').filter((l) => l !== '')

  const output = nsplit.slice(0, maxNewlinesPerResponse).join('\n')

  if (nsplit.length > maxNewlinesPerResponse) {
    const fileID = outputToIDFile(text)
    return `${output} ${options.outputFileBaseURL}${fileID}`
  } else {
    return output
  }
}
