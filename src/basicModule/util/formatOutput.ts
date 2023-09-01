import debug from 'debug'

import { getOptions, getWordList } from '../api/db.js'
import { outputToIDFile } from '../api/file.js'

const log = debug('pIRCe:output')

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

  const { outputIRCMaxNewlines, outputFileURLTemplate, outputIRCMaxChars } = options

  if (nsplit.length > outputIRCMaxNewlines || text.length > outputIRCMaxChars) {
    const fileID = await outputToIDFile(text)

    // assume response is something like song lyrics if first line doesn't end with punctuation
    const joinWith = /.*[.!?:;"]$/.test(nsplit[0]) ? ' ' : ' / '

    const output = nsplit.slice(0, outputIRCMaxNewlines).join(joinWith).slice(0, outputIRCMaxChars)
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
