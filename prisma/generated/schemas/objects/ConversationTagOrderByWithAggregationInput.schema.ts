import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ConversationTagCountOrderByAggregateInputObjectSchema } from './ConversationTagCountOrderByAggregateInput.schema';
import { ConversationTagAvgOrderByAggregateInputObjectSchema } from './ConversationTagAvgOrderByAggregateInput.schema';
import { ConversationTagMaxOrderByAggregateInputObjectSchema } from './ConversationTagMaxOrderByAggregateInput.schema';
import { ConversationTagMinOrderByAggregateInputObjectSchema } from './ConversationTagMinOrderByAggregateInput.schema';
import { ConversationTagSumOrderByAggregateInputObjectSchema } from './ConversationTagSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    profileID: z.lazy(() => SortOrderSchema).optional(),
    profileVersion: z.lazy(() => SortOrderSchema).optional(),
    messageID: z.lazy(() => SortOrderSchema).optional(),
    metadata: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => ConversationTagCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => ConversationTagAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => ConversationTagMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => ConversationTagMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => ConversationTagSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const ConversationTagOrderByWithAggregationInputObjectSchema = Schema;
