import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => WordListWhereInputObjectSchema),
        z.lazy(() => WordListWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => WordListWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => WordListWhereInputObjectSchema),
        z.lazy(() => WordListWhereInputObjectSchema).array(),
      ])
      .optional(),
    word: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const WordListWhereInputObjectSchema = Schema;
