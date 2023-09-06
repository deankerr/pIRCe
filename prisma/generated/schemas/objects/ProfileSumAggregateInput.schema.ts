import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    version: z.literal(true).optional(),
    postPromptOffset: z.literal(true).optional(),
    maxHistoryLength: z.literal(true).optional(),
    maxLocalIRCLength: z.literal(true).optional(),
  })
  .strict();

export const ProfileSumAggregateInputObjectSchema = Schema;
