import { createTRPCRouter } from '~/server/api/trpc'
import { botConfigRouter } from './routers/botConfig'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  botConfig: botConfigRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
