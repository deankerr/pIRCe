import fs from 'node:fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  await prisma.route.deleteMany({})
  await prisma.chatProfile.deleteMany({})
  await prisma.options.deleteMany({})
  await prisma.message.deleteMany({})
  await prisma.moderation.deleteMany({})
}

const testPrompt = fs.readFileSync('prisma/test-prompt.txt', 'utf8')

await prisma.route.create({
  data: {
    server: '*',
    target: '*',
    matcher: 'adminKeyword',

    handler: 'admin',
  },
})

await prisma.route.create({
  data: {
    server: '*',
    target: '#',
    matcher: 'firstWordIsOurNick',

    handler: 'chat',

    chatProfile: {
      create: {
        label: 'bart',

        prompt: testPrompt,

        maxTokens: 128,
        stop: [],

        maxHistorySize: 20,
      },
    },
  },
})

await prisma.options.create({
  data: {
    options: 'options',
    wordListReplacer: '***',
    requireModeration: false,
    allowModCategories: [],
  },
})
