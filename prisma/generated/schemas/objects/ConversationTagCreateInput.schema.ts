import { z } from 'zod';
import { ProfileCreateNestedOneWithoutConversationTagInputObjectSchema } from './ProfileCreateNestedOneWithoutConversationTagInput.schema';
import { MessageCreateNestedOneWithoutConversationTagInputObjectSchema } from './MessageCreateNestedOneWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateInput> = z
  .object({
    metadata: z.string().optional().nullable(),
    owner: z.lazy(
      () => ProfileCreateNestedOneWithoutConversationTagInputObjectSchema,
    ),
    message: z.lazy(
      () => MessageCreateNestedOneWithoutConversationTagInputObjectSchema,
    ),
  })
  .strict();

export const ConversationTagCreateInputObjectSchema = Schema;
