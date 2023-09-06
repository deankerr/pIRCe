import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MessageCountOrderByAggregateInputObjectSchema } from './MessageCountOrderByAggregateInput.schema';
import { MessageAvgOrderByAggregateInputObjectSchema } from './MessageAvgOrderByAggregateInput.schema';
import { MessageMaxOrderByAggregateInputObjectSchema } from './MessageMaxOrderByAggregateInput.schema';
import { MessageMinOrderByAggregateInputObjectSchema } from './MessageMinOrderByAggregateInput.schema';
import { MessageSumOrderByAggregateInputObjectSchema } from './MessageSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    target: z.lazy(() => SortOrderSchema).optional(),
    nick: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    self: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    mask: z.lazy(() => SortOrderSchema).optional(),
    server: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => MessageCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => MessageAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => MessageMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => MessageMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => MessageSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const MessageOrderByWithAggregationInputObjectSchema = Schema;
