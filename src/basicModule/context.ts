// import { initOptions } from './db.js'

const server = process.argv[2]
const nick = process.argv[3]
if (!server || !nick) throw new Error(`Server/nick arguments invalid ${server}/${nick}`)

// const options = await initOptions()

export const context = {
  server,
  self: {
    nick,
  },
}
