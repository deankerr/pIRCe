import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import util from 'node:util'
import debug from 'debug'
import { nanoid } from 'nanoid'
import { getOptions } from './db.js'

const log = debug('pIRCe:file')

async function appendLog(name: string, data: unknown) {
  try {
    const filename = `${name}.log`
    const filepath = await getFilepath('logs', filename)
    await writeFile(filepath, util.format('%o', data))
  } catch (error) {
    log(error)
  }
}

async function errorLog(name: string, data: unknown) {
  try {
    const filename = `${name}-${new Date().toJSON()}.log`
    const filepath = await getFilepath('logs', filename)
    await writeFile(filepath, util.format('%o', data))
  } catch (error) {
    log(error)
  }
}

async function getFilepath(outputDir: string, filename: string) {
  await mkdir(outputDir, { recursive: true })
  return join(outputDir, filename)
}

async function text(text: string) {
  return file(text, 'txt', 'utf8')
}

async function base64ToPNG(data: string) {
  return file(data, 'png', 'base64')
}

async function file(data: string, extension: string, encoding?: BufferEncoding) {
  try {
    const options = await getOptions()
    const id = nanoid(options.outputFilenameLength)
    const filename = `${id}.${extension}`
    const filepath = await getFilepath(options.outputFilePath, filename)

    await writeFile(filepath, data, encoding)
    log('created %o', filepath)

    if (options.outputFileBaseURL) {
      return options.outputFileBaseURL + options.outputURLFilenameExtension ? extension : ''
    } else {
      return filename
    }
  } catch (error) {
    log(error)
    return null
  }
}

export const create = { text, base64ToPNG, file, errorLog, appendLog }
