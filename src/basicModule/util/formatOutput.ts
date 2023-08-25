import { getOptions, getWordList } from '../api/db.js'
import { outputToIDFile } from '../api/file.js'
import { create } from './logger.js'

const log = create('output')

export async function formatOutput(text: string) {
  let filtered = text

  const words = await getWordList()
  const options = await getOptions()

  for (const { word } of words) {
    const regex = new RegExp(`${word}`, 'gi')
    filtered = filtered.replaceAll(regex, '****')
  }

  // split any newlines, remove blanks, trim
  const nsplit = filtered
    .split('\n')
    .filter((l) => l !== '')
    .map((l) => l.trim())

  const { outputIRCMaxNewlines, outputFileURLTemplate } = options

  if (nsplit.length > outputIRCMaxNewlines) {
    const fileID = await outputToIDFile(text)
    // concat up to four lines together, join with /
    const output = nsplit.slice(0, outputIRCMaxNewlines).join(' / ')
    if (!outputFileURLTemplate) {
      log(
        'add a outputFileURLTemplate option with a % char to replace with filename to enable file URL output',
      )
      return output
    } else {
      return `${output} ${outputFileURLTemplate.replace('%', fileID)}`
    }
  } else {
    return nsplit.slice(0, outputIRCMaxNewlines).join('\n')
  }
}

// const sentenceChunks = filtered.match(/[^.!?"]*[.!?"]+|[^.!?"]+$/g)
