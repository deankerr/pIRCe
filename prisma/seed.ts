import fs from 'node:fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  await prisma.tag.deleteMany({})
  await prisma.route.deleteMany({})
  await prisma.profile.deleteMany({})
  await prisma.message.deleteMany({})
  await prisma.options.deleteMany({})
}

const bartPrompt = fs.readFileSync('prisma/prompt-bart.txt', 'utf8')
const eeePrompt = fs.readFileSync('prisma/prompt-eee.txt', 'utf8')

await prisma.route.create({
  data: {
    server: '*',
    target: '*',
    startsWith: '{{admin}}',
    handler: 'admin',
  },
})

await prisma.route.create({
  data: {
    server: '*',
    target: '#',
    contains: '{{nick}}',
    handler: 'chat',

    profile: {
      create: {
        id: 'bart',
        prompt: bartPrompt,
        maxTokens: 128,
        stop: [],
        maxHistorySize: 20,
      },
    },
  },
})

await prisma.route.create({
  data: {
    server: '*',
    target: '#',
    startsWith: '@eee',
    handler: 'chat',
    profile: {
      create: {
        id: 'eee',
        prompt: eeePrompt,
        maxTokens: 50,
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
