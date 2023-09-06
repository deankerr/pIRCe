import { z } from 'zod';
import { ProfileCreateNestedOneWithoutConversationTagInputObjectSchema } from './ProfileCreateNestedOneWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateWithoutMessageInput> = z
  .object({
    metadata: z.string().optional().nullable(),
    owner: z.lazy(
      () => ProfileCreateNestedOneWithoutConversationTagInputObjectSchema,
    ),
  })
  .strict();

export const ConversationTagCreateWithoutMessageInputObjectSchema = Schema;
