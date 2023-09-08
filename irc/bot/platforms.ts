//^ attach + validate at start?
// TODO: temp headers set up. keys also can be in db
// ? function call gets headers, retrieves env/db values at that time

export const platforms = {
  openai: {
    getHeaders: () => {
      return {
        Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}`,
      }
    },
    chat: 'https://api.openai.com/v1/chat/completions',
    image: 'https://api.openai.com/v1/images/generations',
    moderation: 'https://api.openai.com/v1/moderations',
  },
  openrouter: {
    getHeaders: () => {
      return {
        Authorization: `Bearer ${getEnv('OPENROUTER_API_KEY')}`,
        'HTTP-Referer': `${getEnv('OPENROUTER_YOUR_SITE_URL')}`, //& these in the db now
        // 'X-Title': `${getEnv('OPENROUTER_YOUR_APP_NAME')}`, //& optional
      }
    },
    chat: 'https://api.openai.com/v1/chat/completions',
  },
  togetherai: {
    getHeaders: () => {
      return {
        Authorization: `Bearer ${getEnv('TOGETHERAI_API_KEY')}`,
      }
    },
    chat: 'https://api.together.xyz/inference',
    image: 'https://api.together.xyz/inference',
  },
}

// TODO BAD
export function getPlatformInfo(id: string, feature: string) {
  if (id in platforms) {
    const p = platforms[id as keyof typeof platforms]
    if (feature in p) {
      const url = p[feature as keyof typeof p] as string
      const headers = p.getHeaders()
      return { url, headers } as { url: string; headers: Record<string, string> }
    }
  }
  throw new Error('invalid platform id/feature')
}

function getEnv(key: string) {
  if (!process.env[key]) throw new Error(`${key} not set`)
  return process.env[key]
}
