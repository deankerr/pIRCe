import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProfileCountOrderByAggregateInputObjectSchema } from './ProfileCountOrderByAggregateInput.schema';
import { ProfileAvgOrderByAggregateInputObjectSchema } from './ProfileAvgOrderByAggregateInput.schema';
import { ProfileMaxOrderByAggregateInputObjectSchema } from './ProfileMaxOrderByAggregateInput.schema';
import { ProfileMinOrderByAggregateInputObjectSchema } from './ProfileMinOrderByAggregateInput.schema';
import { ProfileSumOrderByAggregateInputObjectSchema } from './ProfileSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    version: z.lazy(() => SortOrderSchema).optional(),
    label: z.lazy(() => SortOrderSchema).optional(),
    description: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    parameters: z.lazy(() => SortOrderSchema).optional(),
    modelID: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    platformID: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    mainPrompt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    examplePrompt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    postPrompt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    postPromptOffset: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    maxHistoryLength: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    maxLocalIRCLength: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => ProfileCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => ProfileAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ProfileMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ProfileMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ProfileSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ProfileOrderByWithAggregationInputObjectSchema = Schema;
