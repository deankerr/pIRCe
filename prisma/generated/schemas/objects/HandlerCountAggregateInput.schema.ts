import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    allowChannel: z.literal(true).optional(),
    allowQuery: z.literal(true).optional(),
    restrictServer: z.literal(true).optional(),
    restrictTarget: z.literal(true).optional(),
    restrictAdmin: z.literal(true).optional(),
    triggerWord: z.literal(true).optional(),
    triggerType: z.literal(true).optional(),
    feature: z.literal(true).optional(),
    profileID: z.literal(true).optional(),
    overrideOutputTarget: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const HandlerCountAggregateInputObjectSchema = Schema;
