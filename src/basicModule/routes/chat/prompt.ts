import type { Message, Profile } from '@prisma/client'

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
      return { role: roles.system, name: 'example_asst', content: '' }
    default:
      throw new Error('Invalid role')
  }
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
      content: message.content,
    })

    if (value) {
      messages.push({ role: roles.assistant, content: value })
    }
  }

  messages.push({
    role: roles.user,
    name: latest.nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'),
    content: latest.content,
  })

  return messages
}
