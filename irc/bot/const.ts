export const TRIGGER_TYPE = {
  command: 'command',
  mention: 'mention',
  anything: 'anything',
} as const

export const WILDCARD = {
  nick: '__NICK__',
} as const

export const PROMPT_FORMAT = {
  openai: 'openai',
  alpaca: 'alpaca',
} as const
