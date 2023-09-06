import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ModelOrderByRelationAggregateInputObjectSchema } from './ModelOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    label: z.lazy(() => SortOrderSchema).optional(),
    apiKey: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    model: z
      .lazy(() => ModelOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const PlatformOrderByWithRelationInputObjectSchema = Schema;
