// import { createWriteStream } from 'node:fs'
// import { mkdir, writeFile } from 'node:fs/promises'
// import { join } from 'node:path'
// import { pipeline } from 'node:stream'
// import util, { promisify } from 'node:util'
import debug from 'debug'
import got from 'got'
import { nanoid } from 'nanoid'
import { getOptions } from './db.js'

const log = debug('pIRCe:file')

function appendLog(name: string, data: unknown) {
  try {
    const filename = `${name}.log`
    // const filepath = await getFilepath('logs', filename)
    // await writeFile(filepath, util.format('%o', data))
  } catch (error) {
    log(error)
  }
}

function errorLog(name: string, data: unknown) {
  try {
    const filename = `error-${name}-${new Date().toISOString()}.log`
    // const filepath = await getFilepath('logs', filename)
    // await writeFile(filepath, util.format('%o', data))
    // log('created %o', filepath)
  } catch (error) {
    log(error)
  }
}

async function getFilepath(outputDir: string, filename: string) {
  // await mkdir(outputDir, { recursive: true })
  // return join(outputDir, filename)
}

async function text(text: string) {
  return file(text, 'txt', 'utf8')
}

async function base64ToPNG(data: string) {
  return file(data, 'png', 'base64')
}

async function file(data: string, extension: string, encoding?: BufferEncoding) {
  try {
    return 'not implemented'
    const options = await getOptions()
    const id = nanoid(options.outputFilenameLength)
    const filename = `${id}.${extension}`
    const filepath = await getFilepath(options.outputFilePath, filename)

    // await writeFile(filepath, data, encoding)

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
    const response = got.stream(url)
    const options = await getOptions()
    const id = nanoid(options.outputFilenameLength)
    const filename = `${id}.png`
    const filepath = await getFilepath(options.outputFilePath, filename)

    // await streamPipeline(response, createWriteStream(filepath))

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

export const create = { text, base64ToPNG, file, errorLog, appendLog, fetchAndSavePNG }
