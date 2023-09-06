import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { OptionsCountOrderByAggregateInputObjectSchema } from './OptionsCountOrderByAggregateInput.schema';
import { OptionsAvgOrderByAggregateInputObjectSchema } from './OptionsAvgOrderByAggregateInput.schema';
import { OptionsMaxOrderByAggregateInputObjectSchema } from './OptionsMaxOrderByAggregateInput.schema';
import { OptionsMinOrderByAggregateInputObjectSchema } from './OptionsMinOrderByAggregateInput.schema';
import { OptionsSumOrderByAggregateInputObjectSchema } from './OptionsSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsOrderByWithAggregationInput> = z
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
    _count: z
      .lazy(() => OptionsCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => OptionsAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => OptionsMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => OptionsMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => OptionsSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const OptionsOrderByWithAggregationInputObjectSchema = Schema;
