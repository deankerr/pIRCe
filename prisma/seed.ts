import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  await prisma.route.deleteMany({})
  await prisma.aIProfile.deleteMany({})
  await prisma.promptItem.deleteMany({})
  await prisma.options.deleteMany({})
}

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

    aiProfile: {
      create: {
        label: 'bart',

        promptItem: {
          create: {
            label: 'bart prompt',
            role: 'system',
            content: 'Your responses must sound like they are dialogue from Bart Simpson.',
          },
        },

        maxTokens: 40,
        stop: [],
      },
    },
  },
})

await prisma.options.create({
  data: {
    options: 'options',
    replaceWith: '***',
    requireModeration: false,
    allowModCategories: [],
  },
})
