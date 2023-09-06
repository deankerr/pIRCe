import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    profileID: z.literal(true).optional(),
  })
  .strict();

export const HandlerSumAggregateInputObjectSchema = Schema;
