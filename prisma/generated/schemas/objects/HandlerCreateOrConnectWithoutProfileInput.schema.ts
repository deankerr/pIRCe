import { z } from 'zod';
import { HandlerWhereUniqueInputObjectSchema } from './HandlerWhereUniqueInput.schema';
import { HandlerCreateWithoutProfileInputObjectSchema } from './HandlerCreateWithoutProfileInput.schema';
import { HandlerUncheckedCreateWithoutProfileInputObjectSchema } from './HandlerUncheckedCreateWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerCreateOrConnectWithoutProfileInput> = z
  .object({
    where: z.lazy(() => HandlerWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => HandlerCreateWithoutProfileInputObjectSchema),
      z.lazy(() => HandlerUncheckedCreateWithoutProfileInputObjectSchema),
    ]),
  })
  .strict();

export const HandlerCreateOrConnectWithoutProfileInputObjectSchema = Schema;
