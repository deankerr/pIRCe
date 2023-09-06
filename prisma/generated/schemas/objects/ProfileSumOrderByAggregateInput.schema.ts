import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    version: z.lazy(() => SortOrderSchema).optional(),
    postPromptOffset: z.lazy(() => SortOrderSchema).optional(),
    maxHistoryLength: z.lazy(() => SortOrderSchema).optional(),
    maxLocalIRCLength: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProfileSumOrderByAggregateInputObjectSchema = Schema;
