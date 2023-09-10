export const platforms = {
  openai: {
    features: {
      chat: 'https://api.openai.com/v1/chat/completions',
      image: 'https://api.openai.com/v1/images/generations',
      moderation: 'https://api.openai.com/v1/moderations',
    },
    headers: {
      Authorization: 'Bearer',
    },
  },
  openrouter: {
    features: { chat: 'https://openrouter.ai/api/v1/chat/completions' },
    headers: {
      Authorization: 'Bearer',
      'HTTP-Referer': '',
      'X-Title': '',
    },
  },
  togetherai: {
    features: {
      chat: 'https://api.together.xyz/inference',
      image: 'https://api.together.xyz/inference',
    },
    headers: {
      Authorization: 'Bearer',
    },
  },
}

export type PlatformID = keyof typeof platforms
