import fs from 'node:fs'
import { nanoid } from 'nanoid'

// save AI output to .txt file, return file path
const dirName = 'output'

function getOutputPath(filename: string) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
  return `${dirName}/${filename}`
}

export function outputToIDFile(content: string) {
  const id = nanoid(3)
  fs.writeFile(getOutputPath(`${id}.txt`), content, (err) => {
    if (err) throw err
  })
  return id
}
