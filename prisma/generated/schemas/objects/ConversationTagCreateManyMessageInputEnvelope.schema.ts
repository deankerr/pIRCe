import { z } from 'zod';
import { ConversationTagCreateManyMessageInputObjectSchema } from './ConversationTagCreateManyMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateManyMessageInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ConversationTagCreateManyMessageInputObjectSchema),
        z.lazy(() => ConversationTagCreateManyMessageInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ConversationTagCreateManyMessageInputEnvelopeObjectSchema = Schema;
