import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    messageID: z.literal(true).optional(),
  })
  .strict();

export const TagSumAggregateInputObjectSchema = Schema;
