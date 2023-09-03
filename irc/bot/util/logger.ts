import debug from 'debug'

debug.formatters.m = (v) => {
  if (typeof v === 'object') {
    const role = v.role ? v.role[0].toUpperCase() : ''
    const nick = v.name || v.nick || ''
    const text = v.content || ''

    let result = `${role ? `(${role}) ` : ''}<${nick}> ${text}`.slice(0, 77)
    if (result.length === 77) result += '...'

    return result
  }

  if (typeof v === 'string') {
    let result = v.slice(0, 77)
    if (result.length === 77) result += '...'
    return result
  }

  return v
}
