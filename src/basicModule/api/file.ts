import fs from 'node:fs'
import { nanoid } from 'nanoid'

import { getOptions } from './db.js'

async function getOutputPath(filename: string) {
  const options = await getOptions()
  const dirName = options.outputFileDir

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
  return `${dirName}/${filename}`
}

export async function outputToIDFile(content: string) {
  const options = await getOptions()
  const id = nanoid(options.outputFilenameIDLength)
  const filepath = await getOutputPath(`${id}.txt`)

  fs.writeFile(filepath, content, (err) => {
    if (err) throw err
  })
  return id
}
