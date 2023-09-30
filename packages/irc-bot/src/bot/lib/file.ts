import { mkdir } from 'node:fs/promises'
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
    // await writeFile(filepath, util.format('%o', data))
    await Bun.write(filepath, util.format('%o', data))
  } catch (error) {
    log(error)
  }
}

async function errorLog(name: string, data: unknown) {
  try {
    const filename = `error-${name}-${new Date().toISOString()}.log`
    const filepath = await getFilepath('logs', filename)
    // await writeFile(filepath, util.format('%o', data))
    await Bun.write(filepath, util.format('%o', data))
    log('created %o', filepath)
  } catch (error) {
    log(error)
  }
}

async function getFilepath(outputDir: string, filename: string) {
  await mkdir(outputDir, { recursive: true })
  return join(outputDir, filename)
}

async function text(text: string) {
  return file(text, 'txt')
}

// async function base64ToPNG(data: string) {
//   return file(data, 'png', 'base64')
// }

async function file(data: string, extension: string) {
  try {
    return 'not implemented'
    const options = await getOptions()
    const id = nanoid(options.outputFilenameLength)
    const filename = `${id}.${extension}`
    const filepath = await getFilepath(options.outputFilePath, filename)

    // await writeFile(filepath, data, encoding)
    await Bun.write(filepath, data)

    log('created %o', filepath)

    if (options.outputFileBaseURL) {
      let label = options.outputFileBaseURL + id
      if (options.outputURLFilenameExtension) label += `.${extension}`
      return label
    } else {
      return filename
    }
  } catch (error) {
    log(error)
    return null
  }
}

// const streamPipeline = promisify(pipeline)

export async function fetchAndSavePNG(url: string) {
  try {
    // const response = got.stream(url)
    const response = await fetch(url)
    const options = await getOptions()
    const id = nanoid(options.outputFilenameLength)
    const filename = `${id}.png`
    const filepath = await getFilepath(options.outputFilePath, filename)

    // await streamPipeline(response, createWriteStream(filepath))
    const blob = await response.blob()
    await Bun.write(filepath, blob)

    log('created %o', filepath)

    if (options.outputFileBaseURL) {
      let label = options.outputFileBaseURL + id
      if (options.outputURLFilenameExtension) label += `.png`
      return label
    } else {
      return filename
    }
  } catch (error) {
    log(error)
    return null
  }
}

export const create = { text, file, errorLog, appendLog, fetchAndSavePNG }
