import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateManyOwnerInput> = z
  .object({
    id: z.number().optional(),
    messageID: z.number(),
    metadata: z.string().optional().nullable(),
  })
  .strict();

export const ConversationTagCreateManyOwnerInputObjectSchema = Schema;
