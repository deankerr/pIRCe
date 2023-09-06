import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagProfileIDProfileVersionMessageIDCompoundUniqueInput> =
  z
    .object({
      profileID: z.number(),
      profileVersion: z.number(),
      messageID: z.number(),
    })
    .strict();

export const ConversationTagProfileIDProfileVersionMessageIDCompoundUniqueInputObjectSchema =
  Schema;
