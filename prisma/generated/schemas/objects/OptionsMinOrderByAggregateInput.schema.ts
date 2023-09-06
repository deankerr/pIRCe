import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsMinOrderByAggregateInput> = z
  .object({
    options: z.lazy(() => SortOrderSchema).optional(),
    moderationProfile: z.lazy(() => SortOrderSchema).optional(),
    outputFileURLTemplate: z.lazy(() => SortOrderSchema).optional(),
    outputFileDir: z.lazy(() => SortOrderSchema).optional(),
    outputFilenameIDLength: z.lazy(() => SortOrderSchema).optional(),
    outputIRCMaxNewlines: z.lazy(() => SortOrderSchema).optional(),
    outputIRCMaxChars: z.lazy(() => SortOrderSchema).optional(),
    apiTimeoutMs: z.lazy(() => SortOrderSchema).optional(),
    appName: z.lazy(() => SortOrderSchema).optional(),
    appURL: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const OptionsMinOrderByAggregateInputObjectSchema = Schema;
