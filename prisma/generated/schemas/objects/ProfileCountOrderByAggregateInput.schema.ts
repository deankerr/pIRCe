import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    version: z.lazy(() => SortOrderSchema).optional(),
    label: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    parameters: z.lazy(() => SortOrderSchema).optional(),
    modelID: z.lazy(() => SortOrderSchema).optional(),
    platformID: z.lazy(() => SortOrderSchema).optional(),
    mainPrompt: z.lazy(() => SortOrderSchema).optional(),
    examplePrompt: z.lazy(() => SortOrderSchema).optional(),
    postPrompt: z.lazy(() => SortOrderSchema).optional(),
    postPromptOffset: z.lazy(() => SortOrderSchema).optional(),
    maxHistoryLength: z.lazy(() => SortOrderSchema).optional(),
    maxLocalIRCLength: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProfileCountOrderByAggregateInputObjectSchema = Schema;
