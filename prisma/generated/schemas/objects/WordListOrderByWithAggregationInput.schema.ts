import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { WordListCountOrderByAggregateInputObjectSchema } from './WordListCountOrderByAggregateInput.schema';
import { WordListMaxOrderByAggregateInputObjectSchema } from './WordListMaxOrderByAggregateInput.schema';
import { WordListMinOrderByAggregateInputObjectSchema } from './WordListMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.WordListOrderByWithAggregationInput> = z
  .object({
    word: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => WordListCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => WordListMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => WordListMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const WordListOrderByWithAggregationInputObjectSchema = Schema;
