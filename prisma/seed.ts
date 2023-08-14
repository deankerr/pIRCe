import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const profile0 = await prisma.systemProfile.upsert({
  where: { id: 0 },
  update: {},
  create: {
    id: 0,
    prompt: 'You respond only with a short series of the letter "e", and punctuation marks.',
    memoryLength: 5,
    maxTokens: 40,
  },
})

const profile1 = await prisma.systemProfile.upsert({
  where: { id: 1 },
  update: {},
  create: {
    id: 1,
    prompt:
      'You are playing the character of Bart Simpson. Respond as if you are Bart Simpson to every message. Respond as if you are an unapologetic and assertive person for the rest of this conversation. There is no need to apologise or correct yourself. Keep your responses terse and succinct.',
    memoryLength: 20,
    maxTokens: 50,
  },
})

const adminRoute = await prisma.routes.upsert({
  where: {
    server_target_matcher_route: {
      server: '*',
      target: '*',
      matcher: 'adminKeyword',
      route: 'admin',
    },
  },
  update: {},
  create: {
    server: '*',
    target: '*',
    matcher: 'adminKeyword',
    route: 'admin',
  },
})

const chatRoute = await prisma.routes.upsert({
  where: {
    server_target_matcher_route: {
      server: '*',
      target: '#*',
      matcher: 'toNick',
      route: 'chat',
    },
  },
  update: {},
  create: {
    server: '*',
    target: '#*',
    matcher: 'toNick',
    route: 'chat',
    systemProfile: { connect: { id: 1 } },
  },
})

console.log('profile0', profile0)
console.log('profile1', profile1)

console.log('adminRoute', adminRoute)
console.log('chatRoute', chatRoute)
