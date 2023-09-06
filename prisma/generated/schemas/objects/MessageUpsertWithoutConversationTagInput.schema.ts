import { z } from 'zod';
import { MessageUpdateWithoutConversationTagInputObjectSchema } from './MessageUpdateWithoutConversationTagInput.schema';
import { MessageUncheckedUpdateWithoutConversationTagInputObjectSchema } from './MessageUncheckedUpdateWithoutConversationTagInput.schema';
import { MessageCreateWithoutConversationTagInputObjectSchema } from './MessageCreateWithoutConversationTagInput.schema';
import { MessageUncheckedCreateWithoutConversationTagInputObjectSchema } from './MessageUncheckedCreateWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageUpsertWithoutConversationTagInput> = z
  .object({
    update: z.union([
      z.lazy(() => MessageUpdateWithoutConversationTagInputObjectSchema),
      z.lazy(
        () => MessageUncheckedUpdateWithoutConversationTagInputObjectSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => MessageCreateWithoutConversationTagInputObjectSchema),
      z.lazy(
        () => MessageUncheckedCreateWithoutConversationTagInputObjectSchema,
      ),
    ]),
  })
  .strict();

export const MessageUpsertWithoutConversationTagInputObjectSchema = Schema;
