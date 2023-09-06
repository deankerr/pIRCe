import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PlatformOrderByWithRelationInputObjectSchema } from './PlatformOrderByWithRelationInput.schema';
import { ProfileOrderByRelationAggregateInputObjectSchema } from './ProfileOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelOrderByWithRelationInput> = z
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
    platform: z
      .lazy(() => PlatformOrderByWithRelationInputObjectSchema)
      .optional(),
    profile: z
      .lazy(() => ProfileOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const ModelOrderByWithRelationInputObjectSchema = Schema;
