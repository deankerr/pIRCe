import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ModelCountOrderByAggregateInputObjectSchema } from './ModelCountOrderByAggregateInput.schema';
import { ModelMaxOrderByAggregateInputObjectSchema } from './ModelMaxOrderByAggregateInput.schema';
import { ModelMinOrderByAggregateInputObjectSchema } from './ModelMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    label: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    description: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    platformID: z.lazy(() => SortOrderSchema).optional(),
    feature: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    promptFormat: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => ModelCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => ModelMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ModelMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ModelOrderByWithAggregationInputObjectSchema = Schema;
