import { z } from 'zod';
import { ConversationTagCreateNestedManyWithoutMessageInputObjectSchema } from './ConversationTagCreateNestedManyWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCreateInput> = z
  .object({
    target: z.string(),
    nick: z.string(),
    type: z.string(),
    content: z.string(),
    self: z.boolean(),
    time: z.coerce.date().optional(),
    mask: z.string(),
    server: z.string(),
    conversationTag: z
      .lazy(
        () => ConversationTagCreateNestedManyWithoutMessageInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const MessageCreateInputObjectSchema = Schema;
