// * Build OAI Message objects from db data
// * ChatProfile items, parse macros
// * User messages

const roles = {
  system: 'system',
  assistant: 'assistant',
  user: 'user',
} as const

type msgObject = {
  role: 'system' | 'assistant' | 'user'
  name?: string
  content: string
}

type userMsgs = { nick: string; content: string; self: boolean }

export function buildPromptMessages(system: string, user: userMsgs[]) {
  const msg: msgObject[] = []

  // parse system prompt
  const lines = system.split('\n')
  for (const line of lines) {
    if (line.startsWith('::')) {
      // create new msg block
      msg.push(createMsg(line.slice(2)))
    } else {
      // add text
      msg[msg.length - 1].content += line
    }
  }

  // parse user messages
  for (const { nick, content, self } of user) {
    if (self) {
      msg.push({ role: roles.assistant, content })
    } else {
      msg.push({ role: roles.user, name: nick.replaceAll(/[^a-zA-Z0-9_]/g, '_'), content })
    }
  }

  return msg
}

function createMsg(role: string): msgObject {
  switch (role) {
    case 'system':
      return { role: roles.system, content: '' }
    case 'assistant':
      return { role: roles.assistant, content: '' }
    case 'user':
      return { role: roles.user, content: '' }
    case 'example_user':
      return { role: roles.system, name: 'example_user', content: '' }
    case 'example_asst':
      return { role: roles.system, name: 'example_asst', content: '' }
    default:
      throw new Error('Invalid role')
  }
}
