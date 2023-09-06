import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListWhereUniqueInput> = z
  .object({
    word: z.string().optional(),
  })
  .strict();

export const WordListWhereUniqueInputObjectSchema = Schema;
