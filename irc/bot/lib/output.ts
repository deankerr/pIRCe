import { getOptions } from '../api/db.js'
import { create } from '../api/file.js'

export async function format(text: string) {
  const options = await getOptions()

  const filtered = applyWordFilter(options.wordFilterList, text)
  const output = formatNewlines(options.outputIRCMessageMaxNewlines, filtered)

  // add text file URL output if above max char length
  if (output.length > options.outputIRCMessageMaxLength) {
    const fileLabel = await create.text(output)
    return output + fileLabel
  } else {
    return output
  }
}

// const sentenceChunks = filtered.match(/[^.!?"]*[.!?"]+|[^.!?"]+$/g)

function applyWordFilter(list: string[], text: string) {
  let filtered = text
  for (const word of list) {
    filtered = text.replaceAll(new RegExp(`${word}`, 'gi'), '****')
  }

  return filtered
}

function formatNewlines(maxNewlines: number, text: string) {
  // split any newlines, remove blanks, trim
  const lines = text
    .split('\n')
    .filter((l) => l !== '')
    .map((l) => l.trim())

  // concatenate to single line if above max
  if (lines.length > maxNewlines) {
    return lines.reduce((acc, cur) => {
      // if line doesn't end with punctuation, assume something like lyrics; join with slash
      const joinChar = /.*[.!?:;"]$/.test(cur) ? ' ' : ' / '
      return acc + joinChar + cur
    })
  } else {
    return lines.join('\n')
  }
}
// export function respond(ctx: InitialContext | ActionContext) {
//
// }
