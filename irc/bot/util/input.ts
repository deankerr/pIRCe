import type { Message, Profile } from '@prisma/client'
import type { AIChatMessage } from '../types'

// replace invalid nick chars, replace/remove trigger keywords
export function stripInitialKeyword(input: string, keyword: string) {
  return input.replace(keyword, '').trim()
}

export function replaceNameChars(input: string) {
  return input.replaceAll(/[^a-zA-Z0-9_]/g, '_')
}

function normalizeMessage(input: AIChatMessage, keyword: string) {
  if (input.name) {
    return {
      ...input,
      name: replaceNameChars(input.name),
      content: stripInitialKeyword(input.content, keyword),
    }
  } else {
    return {
      ...input,
      content: stripInitialKeyword(input.content, keyword),
    }
  }
}

export function normalizeAPIInput<T extends AIChatMessage | AIChatMessage[] | string>(
  input: T,
  keyword: string | null,
): T {
  const word = keyword ?? ''
  if (typeof input === 'string') return stripInitialKeyword(input, word) as T

  if (Array.isArray(input)) {
    return input.map((msg) => normalizeMessage(msg, word)) as T
  } else {
    return normalizeMessage(input, word) as T
  }
}

const roles = {
  system: 'system',
  user: 'user',
  assistant: 'assistant',
} as const

export function buildOpenChatMessages(profile: Profile, conversation: Message[]): AIChatMessage[] {
  const messages = conversation.map((msg) => {
    if (msg.self) {
      return { role: roles.assistant, content: msg.content }
    } else {
      return { role: roles.user, name: msg.nick, content: msg.content }
    }
  })

  const result = [{ role: roles.system, content: profile.prompt }, ...messages]

  if (profile.promptTail) {
    result.push({ role: roles.system, content: profile.promptTail })
  }

  return result
}
