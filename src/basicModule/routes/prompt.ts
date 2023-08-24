import type { Message, Profile } from '@prisma/client'

import { context } from '../util.js'

const roles = {
  system: 'system',
  assistant: 'assistant',
  user: 'user',
} as const

type MessageItem = {
  role: 'system' | 'assistant' | 'user'
  name?: string
  content: string
}

type historyItem = { message: { nick: string; content: string }; value: string | null }

export function constructProfilePrompt(profile: Profile, history: historyItem[], latest: Message) {
  const messages: MessageItem[] = []

  // parse profile system prompt
  const lines = profile.prompt.split('\n')
  for (const line of lines) {
    if (line.startsWith('::')) {
      // create new msg block
      messages.push(createBlock(line))
    } else {
      // add text
      messages[messages.length - 1].content += line
    }
  }

  // parse history messages
  for (const { message, value } of history) {
    messages.push({
      role: roles.user,
      name: message.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
      content: adaptKeywords(message.content, profile),
    })

    if (value) {
      messages.push({ role: roles.assistant, content: value })
    }
  }

  messages.push({
    role: roles.user,
    name: latest.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
    content: adaptKeywords(latest.content, profile),
  })

  if (profile.promptTail) {
    messages.push({
      role: roles.system,
      content: profile.promptTail,
    })
  }

  return messages
}

function createBlock(role: string): MessageItem {
  switch (role) {
    case '::system':
      return { role: roles.system, content: '' }
    case '::assistant':
      return { role: roles.assistant, content: '' }
    case '::user':
      return { role: roles.user, content: '' }
    case '::example_user':
      return { role: roles.system, name: 'example_user', content: '' }
    case '::example_asst':
      return { role: roles.system, name: 'example_assistant', content: '' }
    default:
      console.log(`Invalid role: ${role}`)
      throw new Error(`Invalid role: ${role}`)
  }
}

export function buildMessages(profile: Profile, messages: Message[]) {
  const result: MessageItem[] = []

  // parse profile system prompt
  const lines = profile.prompt.split('\n')
  for (const line of lines) {
    if (line.startsWith('::')) {
      // create new msg block
      result.push(createBlock(line))
    } else {
      // add text
      result[result.length - 1].content += line
    }
  }

  // parse history messages
  for (const { nick, content, self } of messages) {
    if (self) {
      result.push({
        role: roles.assistant,
        content,
      })
    } else {
      result.push({
        role: roles.user,
        name: nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
        content: adaptKeywords(content, profile),
      })
    }
  }

  if (profile.promptTail) {
    result.push({
      role: roles.system,
      content: profile.promptTail,
    })
  }

  return result
}

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
