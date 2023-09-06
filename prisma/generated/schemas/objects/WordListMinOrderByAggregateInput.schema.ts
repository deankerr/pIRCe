import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListMinOrderByAggregateInput> = z
  .object({
    word: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const WordListMinOrderByAggregateInputObjectSchema = Schema;
