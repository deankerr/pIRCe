import { z } from 'zod';
import { ModelWhereInputObjectSchema } from './ModelWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelListRelationFilter> = z
  .object({
    every: z.lazy(() => ModelWhereInputObjectSchema).optional(),
    some: z.lazy(() => ModelWhereInputObjectSchema).optional(),
    none: z.lazy(() => ModelWhereInputObjectSchema).optional(),
  })
  .strict();

export const ModelListRelationFilterObjectSchema = Schema;
