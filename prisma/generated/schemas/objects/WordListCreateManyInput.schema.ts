import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListCreateManyInput> = z
  .object({
    word: z.string(),
  })
  .strict();

export const WordListCreateManyInputObjectSchema = Schema;
