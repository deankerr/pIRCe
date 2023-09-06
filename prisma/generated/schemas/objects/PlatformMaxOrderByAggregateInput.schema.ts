import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    label: z.lazy(() => SortOrderSchema).optional(),
    apiKey: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PlatformMaxOrderByAggregateInputObjectSchema = Schema;
