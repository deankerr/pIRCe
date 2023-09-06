import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Providers
  // OpenAI
  const openai = await prisma.platform.upsert({
    where: { id: 'openai' },
    update: {},
    create: {
      id: 'openai',
      label: 'OpenAI',
    },
  })

  await prisma.model.upsert({
    where: {
      id_platformID: {
        id: 'gpt-3.5-turbo',
        platformID: openai.id,
      },
    },
    update: {},
    create: {
      id: 'gpt-3.5-turbo',
      label: 'ChatGPT 3.5 Turbo',
      platformID: openai.id,
      feature: 'chat',
      promptStyle: 'openai',
    },
  })

  const modelDALLE = await prisma.model.upsert({
    where: {
      id_platformID: {
        id: 'DALL-E',
        platformID: openai.id,
      },
    },
    update: {},
    create: {
      id: 'DALL-E',
      label: 'DALL-E',
      platformID: openai.id,
      feature: 'image',
      promptStyle: 'openai',
    },
  })

  // OpenRouter
  const openrouter = await prisma.platform.upsert({
    where: { id: 'openrouter' },
    update: {},
    create: {
      id: 'openrouter',
      label: 'OpenRouter',
    },
  })

  await prisma.model.upsert({
    where: {
      id_platformID: {
        id: 'openai/gpt-4',
        platformID: openrouter.id,
      },
    },
    update: {},
    create: {
      id: 'openai/gpt-4',
      label: 'OpenAI: ChatGPT 4',
      platformID: openrouter.id,
      feature: 'chat',
      promptStyle: 'openai',
    },
  })

  await prisma.model.upsert({
    where: {
      id_platformID: {
        id: 'meta-llama/llama-2-70b-chat',
        platformID: openrouter.id,
      },
    },
    update: {},
    create: {
      id: 'meta-llama/llama-2-70b-chat',
      label: 'Meta: Llama v2 70B Chat',
      platformID: openrouter.id,
      feature: 'chat',
      promptStyle: 'openai',
    },
  })

  await prisma.model.upsert({
    where: {
      id_platformID: {
        id: 'nousresearch/nous-hermes-llama2-13b',
        platformID: openrouter.id,
      },
    },
    update: {},
    create: {
      id: 'nousresearch/nous-hermes-llama2-13b',
      label: 'Nous: Hermes Llama2 13B',
      platformID: openrouter.id,
      feature: 'chat',
      promptStyle: 'openai',
    },
  })

  // Together AI
  const togetherai = await prisma.platform.upsert({
    where: { id: 'togetherai' },
    update: {},
    create: {
      id: 'togetherai',
      label: 'Together AI',
    },
  })

  const modelRV = await prisma.model.upsert({
    where: {
      id_platformID: {
        id: 'SG161222/Realistic_Vision_V3.0_VAE',
        platformID: togetherai.id,
      },
    },
    update: {},
    create: {
      id: 'SG161222/Realistic_Vision_V3.0_VAE',
      label: 'Realistic Vision V3.0',
      platformID: togetherai.id,
      feature: 'image',
      promptStyle: 'alpaca',
    },
  })

  // Handlers / Profiles
  // 1 openai turbo, 2. openrouter gpt4, 3. openrouter nous, 4. openai dalle, 5. together real

  //* 4. OpenAI/DALL-E
  const profileDALLE = await prisma.profile.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      id: 4,
      label: 'OpenAI DALL-E',
      parameters: JSON.stringify({
        n: 1,
        size: '512x512',
        response_format: 'b64_json',
      }),
      modelID: modelDALLE.id,
      platformID: openai.id,
    },
  })

  await prisma.handler.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      id: 4,
      triggerWord: '@dalle',
      feature: 'image',
      profileID: profileDALLE.id,
    },
  })

  //* 5. TogetherAI/RealisticVisions
  const profileRV = await prisma.profile.upsert({
    where: {
      id: 5,
    },
    update: {},
    create: {
      id: 5,
      label: 'Realistic Visions 3.0',
      parameters: JSON.stringify({
        n: 1,
      }),
      modelID: modelRV.id,
      platformID: togetherai.id,
    },
  })

  await prisma.handler.upsert({
    where: {
      id: 5,
    },
    update: {},
    create: {
      id: 5,
      triggerWord: '@real',
      feature: 'image',
      profileID: profileRV.id,
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
