const server = process.argv[2] || 'temp.test.server'
const nick = process.argv[3] || 'tempnick'
if (!server || !nick) throw new Error(`Server/nick arguments invalid ${server}/${nick}`)
export const self = { server, nick }

export function randomPick<T>(list: T[]) {
  if (list.length < 1) throw new Error('randomPick needs array length of at least 1')
  const n = Math.round(Math.random() * (list.length - 1))
  return list[n]
}

export function getClown() {
  return randomPick(['🤡', '😋', '🤓', '🤣', '🤪', '🤠'])
}

export function raise(message: string): never {
  throw new Error(message)
}

export function env(key: string) {
  return process.env[key] ?? raise(`${key} not provided`)
}

/* 
const sentenceChunks = filtered.match(/[^.!?"]*[.!?"]+|[^.!?"]+$/g)
*/
