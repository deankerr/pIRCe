import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    profileID: z.literal(true).optional(),
    profileVersion: z.literal(true).optional(),
    messageID: z.literal(true).optional(),
    metadata: z.literal(true).optional(),
  })
  .strict();

export const ConversationTagMinAggregateInputObjectSchema = Schema;
