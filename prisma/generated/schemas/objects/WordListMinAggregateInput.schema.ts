import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListMinAggregateInputType> = z
  .object({
    word: z.literal(true).optional(),
  })
  .strict();

export const WordListMinAggregateInputObjectSchema = Schema;
