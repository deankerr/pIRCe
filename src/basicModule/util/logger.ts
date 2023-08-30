import debug from 'debug'

debug.formatters.m = (v) => {
  if (typeof v === 'object') {
    const role = 'role' in v ? (v.role.toString() as string) : null
    const nick =
      'name' in v
        ? (v.name.toString() as string)
        : 'nick' in v
        ? (v.nick.toString() as string)
        : null
    const text =
      'content' in v
        ? (v.content.toString() as string)
        : 'text' in v
        ? (v.text.toString() as string)
        : null

    let result = ''
    if (role) result += `${role.slice(0, 1).toUpperCase()}|`
    if (nick) result += `${nick}: `
    if (text) result += text.slice(0, 80).replaceAll('\n', '/')

    return result
  }

  if (typeof v === 'string') {
    return v.slice(0, 80)
  }

  return v
}

export const log = debug('pIRCe:bot')

const extLog = debug('pIRCe')
export const create = extLog.extend.bind(extLog)
