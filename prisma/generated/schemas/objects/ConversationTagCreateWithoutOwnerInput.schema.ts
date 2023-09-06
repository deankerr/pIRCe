import { z } from 'zod';
import { MessageCreateNestedOneWithoutConversationTagInputObjectSchema } from './MessageCreateNestedOneWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateWithoutOwnerInput> = z
  .object({
    metadata: z.string().optional().nullable(),
    message: z.lazy(
      () => MessageCreateNestedOneWithoutConversationTagInputObjectSchema,
    ),
  })
  .strict();

export const ConversationTagCreateWithoutOwnerInputObjectSchema = Schema;
