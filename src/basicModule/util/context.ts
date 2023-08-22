// import { initOptions } from './db.js'

export const server = process.argv[2]
export const me = process.argv[3]
if (!server || !me) throw new Error(`Server/nick arguments invalid ${server}/${me}`)
