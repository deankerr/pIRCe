import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => WordListScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => WordListScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => WordListScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => WordListScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => WordListScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    word: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const WordListScalarWhereWithAggregatesInputObjectSchema = Schema;
