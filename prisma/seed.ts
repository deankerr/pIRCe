import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
            label: 'bart',
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
    replaceWith: '***',
    requireModeration: false,
    allowModCategories: [],
  },
})
