export const TRIGGER_TYPE = {
  command: 'command',
  mention: 'mention',
  anything: 'anything',
} as const

export const WILDCARD = {
  nick: '__NICK__',
} as const

export const FEATURES = {
  admin: 'ADMIN',
  chat: 'CHAT',
  image: 'IMAGE',
} as const

export const PLATFORMS = {
  openai: 'openai',
  openrouter: 'openrouter',
  togetherai: 'togetherai',
} as const
