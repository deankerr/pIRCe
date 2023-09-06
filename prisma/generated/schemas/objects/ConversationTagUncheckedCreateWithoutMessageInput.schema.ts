import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUncheckedCreateWithoutMessageInput> =
  z
    .object({
      id: z.number().optional(),
      profileID: z.number(),
      profileVersion: z.number(),
      metadata: z.string().optional().nullable(),
    })
    .strict();

export const ConversationTagUncheckedCreateWithoutMessageInputObjectSchema =
  Schema;
