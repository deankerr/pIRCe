import debug from 'debug'

debug.formatters.m = (v) => {
  if (typeof v === 'object') {
    const role = 'role' in v ? v.role.toString() : null
    const nick = 'name' in v ? v.name.toString() : 'nick' in v ? v.nick.toString() : null
    const text = 'content' in v ? v.content.toString() : 'text' in v ? v.text.toString() : null

    let result = ''
    if (role) result += `${role}]`
    if (nick) result += `<${nick}>`
    if (text) result += text

    return result
  } else return v
}

export const log = debug('pIRCe:bot')

const extLog = debug('pIRCe')
export const dbug = extLog.extend.bind(extLog)
