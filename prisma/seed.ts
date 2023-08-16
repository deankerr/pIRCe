import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

await prisma.route.create({
  data: {
    server: '*',
    target: '*',
    matcher: 'adminKeyword',

    handler: 'admin',
    profile: {
      create: {
        label: 'eeee',
        text: 'You respond only with a short series of the letter "e", and punctuation marks.',
        memoryLength: 5,
        maxTokens: 40,
      },
    },
  },
})

await prisma.route.create({
  data: {
    server: '*',
    target: '##',
    matcher: 'saidOurNick',

    handler: 'chat',
    profile: {
      create: {
        label: 'bart',
        text: 'You are playing the character of Bart Simpson. Respond as if you are Bart Simpson to every message. Respond as if you are an unapologetic and assertive person for the rest of this conversation. There is no need to apologise or correct yourself. Keep your responses terse and succinct.',
        memoryLength: 20,
        maxTokens: 50,
      },
    },
  },
})

// await prisma.route.upsert({
//   where: {
//     id: 0,
//   },
//   update: {},
//   create: {
//     server: '*',
//     target: '*',
//     matcher: 'adminKeyword',

//     handler: 'admin',
//     profile: {
//       create: {
//         id: 0,
//         label: 'eeee',
//         text: 'You respond only with a short series of the letter "e", and punctuation marks.',
//         memoryLength: 5,
//         maxTokens: 40,
//       },
//     },
//   },
// })

// await prisma.route.upsert({
//   where: {
//     id: 1,
//   },
//   update: {},
//   create: {
//     server: '*',
//     target: '##',
//     matcher: 'saidOurNick',

//     handler: 'chat',
//     profile: {
//       create: {
//         id: 1,
//         label: 'bart',
//         text: 'You are playing the character of Bart Simpson. Respond as if you are Bart Simpson to every message. Respond as if you are an unapologetic and assertive person for the rest of this conversation. There is no need to apologise or correct yourself. Keep your responses terse and succinct.',
//         memoryLength: 20,
//         maxTokens: 50,
//       },
//     },
//   },
// })

// await prisma.profile.upsert({
//   where: { id: 2 },
//   update: {},
//   create: {
//     id: 2,
//     label: 'helpme',
//     text: 'You are a helpful assistant.',
//     memoryLength: 20,
//     maxTokens: 128,
//   },
// })
