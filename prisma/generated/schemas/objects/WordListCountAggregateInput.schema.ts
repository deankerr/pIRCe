import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListCountAggregateInputType> = z
  .object({
    word: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const WordListCountAggregateInputObjectSchema = Schema;
