import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    label: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    platformID: z.lazy(() => SortOrderSchema).optional(),
    feature: z.lazy(() => SortOrderSchema).optional(),
    promptFormat: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ModelCountOrderByAggregateInputObjectSchema = Schema;
