import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    label: z.literal(true).optional(),
    apiKey: z.literal(true).optional(),
  })
  .strict();

export const PlatformMinAggregateInputObjectSchema = Schema;
