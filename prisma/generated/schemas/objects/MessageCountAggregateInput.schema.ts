import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    target: z.literal(true).optional(),
    nick: z.literal(true).optional(),
    type: z.literal(true).optional(),
    content: z.literal(true).optional(),
    self: z.literal(true).optional(),
    time: z.literal(true).optional(),
    mask: z.literal(true).optional(),
    server: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const MessageCountAggregateInputObjectSchema = Schema;
