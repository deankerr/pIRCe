import { z } from 'zod';
import { HandlerWhereInputObjectSchema } from './HandlerWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerListRelationFilter> = z
  .object({
    every: z.lazy(() => HandlerWhereInputObjectSchema).optional(),
    some: z.lazy(() => HandlerWhereInputObjectSchema).optional(),
    none: z.lazy(() => HandlerWhereInputObjectSchema).optional(),
  })
  .strict();

export const HandlerListRelationFilterObjectSchema = Schema;
