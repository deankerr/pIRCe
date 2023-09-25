import debug from 'debug'

debug.formatters.m = (v: unknown) => {
  if (typeof v === 'object' && v !== null) {
    const role = 'role' in v && typeof v.role === 'string' ? v.role.slice(0, 1) : ''
    const nick =
      'name' in v && typeof v.name === 'string'
        ? v.name
        : 'nick' in v && typeof v.nick === 'string'
        ? v.nick
        : ''
    const text = 'content' in v && typeof v.content === 'string' ? v.content : ''

    let result = `${role ? `(${role}) ` : ''}<${nick}> ${text}`.slice(0, 77)
    if (result.length === 77) result += '...'

    return result
  }

  if (typeof v === 'string') {
    let result = v.slice(0, 77)
    if (result.length === 77) result += '...'
    return result
  }

  return String(v)
}
