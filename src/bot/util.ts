const server = process.argv[2]
const nick = process.argv[3]
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

/* 

// remove @command + nick if the text starts with either, replace remaining nicks with character name
function adaptKeywords(content: string, profile: Profile) {
  // TODO remove @trigger hardcode
  const nickTrigger = new RegExp(`^${context.me}\\b`)
  const stripTrigger = content.replace(/^@\w*\s/, '').replace(nickTrigger, '')
  return substitute(stripTrigger, context.me, profile.replaceNick)
}

function substitute(content: string, word: string, withWord: string | null) {
  if (withWord === null) return content
  const replacer = new RegExp(`\\b${word}\\b`, 'g')
  return content.replaceAll(replacer, withWord)
}


*/