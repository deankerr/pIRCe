import { z } from 'zod';
import { ConversationTagCreateManyOwnerInputObjectSchema } from './ConversationTagCreateManyOwnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateManyOwnerInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ConversationTagCreateManyOwnerInputObjectSchema),
      z.lazy(() => ConversationTagCreateManyOwnerInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ConversationTagCreateManyOwnerInputEnvelopeObjectSchema = Schema;
