import { z } from 'zod';
import { ConversationTagProfileIDProfileVersionMessageIDCompoundUniqueInputObjectSchema } from './ConversationTagProfileIDProfileVersionMessageIDCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    profileID_profileVersion_messageID: z
      .lazy(
        () =>
          ConversationTagProfileIDProfileVersionMessageIDCompoundUniqueInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ConversationTagWhereUniqueInputObjectSchema = Schema;
