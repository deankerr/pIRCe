import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import util from 'node:util'
import { nanoid } from 'nanoid'
import { getOptions } from './db.js'

async function appendLog(name: string, data: unknown) {
  try {
    const filename = `${name}.log`
    const filepath = await getFilepath('logs', filename)
    // await writeFile(filepath, util.format('%o', data))
    await Bun.write(filepath, util.format('%o', data))
  } catch (error) {
    console.log(error)
  }
}

async function errorLog(name: string, data: unknown) {
  try {
    const filename = `error-${name}-${new Date().toISOString()}.log`
    const filepath = await getFilepath('logs', filename)
    // await writeFile(filepath, util.format('%o', data))
    await Bun.write(filepath, util.format('%o', data))
    console.log('created %o', filepath)
  } catch (error) {
    console.log(error)
  }
}

async function getFilepath(outputDir: string, filename: string) {
  await mkdir(outputDir, { recursive: true })
  return join(outputDir, filename)
}

async function text(text: string) {
  return file(text, 'txt')
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

    if (encoding) await Bun.write(filepath, Buffer.from(data, 'base64'))
    else await Bun.write(filepath, data)

    console.log('created %o', filepath)

    if (options.outputFileBaseURL) {
      let label = options.outputFileBaseURL + id
      if (options.outputURLFilenameExtension) label += `.${extension}`
      return label
    } else {
      return filename
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function fetchAndSavePNG(url: string) {
  try {
    // const response = got.stream(url)
    const response = await fetch(url)
    const options = await getOptions()
    const id = nanoid(options.outputFilenameLength)
    const filename = `${id}.png`
    const filepath = await getFilepath(options.outputFilePath, filename)

    const blob = await response.blob()
    await Bun.write(filepath, blob)

    console.log('created %o', filepath)

    if (options.outputFileBaseURL) {
      let label = options.outputFileBaseURL + id
      if (options.outputURLFilenameExtension) label += `.png`
      return label
    } else {
      return filename
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const create = { text, file, errorLog, appendLog, fetchAndSavePNG, base64ToPNG }
