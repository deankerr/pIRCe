import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    label: z.literal(true).optional(),
    description: z.literal(true).optional(),
    platformID: z.literal(true).optional(),
    feature: z.literal(true).optional(),
    promptFormat: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ModelCountAggregateInputObjectSchema = Schema;
