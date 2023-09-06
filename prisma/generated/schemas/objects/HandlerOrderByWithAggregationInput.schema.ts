import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { HandlerCountOrderByAggregateInputObjectSchema } from './HandlerCountOrderByAggregateInput.schema';
import { HandlerAvgOrderByAggregateInputObjectSchema } from './HandlerAvgOrderByAggregateInput.schema';
import { HandlerMaxOrderByAggregateInputObjectSchema } from './HandlerMaxOrderByAggregateInput.schema';
import { HandlerMinOrderByAggregateInputObjectSchema } from './HandlerMinOrderByAggregateInput.schema';
import { HandlerSumOrderByAggregateInputObjectSchema } from './HandlerSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    allowChannel: z.lazy(() => SortOrderSchema).optional(),
    allowQuery: z.lazy(() => SortOrderSchema).optional(),
    restrictServer: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    restrictTarget: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    restrictAdmin: z.lazy(() => SortOrderSchema).optional(),
    triggerWord: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    triggerType: z.lazy(() => SortOrderSchema).optional(),
    feature: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    profileID: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    overrideOutputTarget: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => HandlerCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => HandlerAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => HandlerMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => HandlerMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => HandlerSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const HandlerOrderByWithAggregationInputObjectSchema = Schema;
