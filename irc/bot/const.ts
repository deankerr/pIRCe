// export const FEATURE = {
//   admin: 'admin',
//   chat: 'chat',
//   image: 'image',
// } as const
// export type Feature = keyof typeof FEATURE

export const TRIGGER_TYPE = {
  command: 'command',
  mention: 'mention',
  anything: 'anything',
} as const

export const WILDCARD = {
  nick: '__NICK__',
} as const

export const PLATFORM = {
  openai: 'openai',
  openrouter: 'openrouter',
  togetherai: 'togetherai',
} as const

export const PROMPT_FORMAT = {
  openai: 'openai',
  alpacca: 'alpacca',
} as const
