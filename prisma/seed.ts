import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Provider
  await prisma.platform.upsert({
    where: { id: 'openai' },
    update: {},
    create: {
      id: 'openai',
      name: 'OpenAI',
    },
  })

  await prisma.platform.upsert({
    where: { id: 'openrouter' },
    update: {},
    create: {
      id: 'openrouter',
      name: 'OpenRouter',
    },
  })

  await prisma.platform.upsert({
    where: { id: 'togetherai' },
    update: {},
    create: {
      id: 'togetherai',
      name: 'Together AI',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
