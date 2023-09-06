import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    allowChannel: z.lazy(() => SortOrderSchema).optional(),
    allowQuery: z.lazy(() => SortOrderSchema).optional(),
    restrictServer: z.lazy(() => SortOrderSchema).optional(),
    restrictTarget: z.lazy(() => SortOrderSchema).optional(),
    restrictAdmin: z.lazy(() => SortOrderSchema).optional(),
    triggerWord: z.lazy(() => SortOrderSchema).optional(),
    triggerType: z.lazy(() => SortOrderSchema).optional(),
    feature: z.lazy(() => SortOrderSchema).optional(),
    profileID: z.lazy(() => SortOrderSchema).optional(),
    overrideOutputTarget: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const HandlerCountOrderByAggregateInputObjectSchema = Schema;
