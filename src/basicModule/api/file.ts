import fs from 'node:fs'
import util from 'node:util'
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

export async function outputBase64ToImage(content: string) {
  const id = nanoid(4)
  const filepath = await getOutputPath(`${id}.png`)
  fs.writeFile(filepath, content, { encoding: 'base64' }, () => {
    console.log('File created.')
  })

  return id
}

export async function utilFormatToFile(filenamePrefix: string, data: unknown) {
  try {
    const fdata = util.format('%o', data)
    const filepath = `logs/${filenamePrefix}-${nanoid(6)}.txt`
    await fs.promises.writeFile(filepath, fdata, 'utf-8')
  } catch (error) {
    console.error('utilFormatToFile error')
    console.error(error)
  }
}
