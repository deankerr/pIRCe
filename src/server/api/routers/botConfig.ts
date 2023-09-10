import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const botConfigRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    }
  }),
  // getRoutes: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.route.findMany()
  // }),
  getProfiles: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findMany()
  }),
  getModels: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.model.findMany()
  }),
  getOptions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.options.findMany()
  }),
})
