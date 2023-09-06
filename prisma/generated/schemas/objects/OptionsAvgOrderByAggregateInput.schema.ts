import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsAvgOrderByAggregateInput> = z
  .object({
    outputFilenameIDLength: z.lazy(() => SortOrderSchema).optional(),
    outputIRCMaxNewlines: z.lazy(() => SortOrderSchema).optional(),
    outputIRCMaxChars: z.lazy(() => SortOrderSchema).optional(),
    apiTimeoutMs: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const OptionsAvgOrderByAggregateInputObjectSchema = Schema;
