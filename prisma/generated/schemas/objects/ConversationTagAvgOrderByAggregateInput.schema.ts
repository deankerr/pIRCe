import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    profileID: z.lazy(() => SortOrderSchema).optional(),
    profileVersion: z.lazy(() => SortOrderSchema).optional(),
    messageID: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ConversationTagAvgOrderByAggregateInputObjectSchema = Schema;
