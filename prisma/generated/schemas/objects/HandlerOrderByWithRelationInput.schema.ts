import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerOrderByWithRelationInput> = z
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
    profile: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict();

export const HandlerOrderByWithRelationInputObjectSchema = Schema;
