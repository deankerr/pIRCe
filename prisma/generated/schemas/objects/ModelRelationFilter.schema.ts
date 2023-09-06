import { z } from 'zod';
import { ModelWhereInputObjectSchema } from './ModelWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelRelationFilter> = z
  .object({
    is: z
      .lazy(() => ModelWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ModelWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ModelRelationFilterObjectSchema = Schema;
