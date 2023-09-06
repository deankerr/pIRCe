import { z } from 'zod';
import { MessageCreateWithoutConversationTagInputObjectSchema } from './MessageCreateWithoutConversationTagInput.schema';
import { MessageUncheckedCreateWithoutConversationTagInputObjectSchema } from './MessageUncheckedCreateWithoutConversationTagInput.schema';
import { MessageCreateOrConnectWithoutConversationTagInputObjectSchema } from './MessageCreateOrConnectWithoutConversationTagInput.schema';
import { MessageUpsertWithoutConversationTagInputObjectSchema } from './MessageUpsertWithoutConversationTagInput.schema';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutConversationTagInputObjectSchema } from './MessageUpdateWithoutConversationTagInput.schema';
import { MessageUncheckedUpdateWithoutConversationTagInputObjectSchema } from './MessageUncheckedUpdateWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageUpdateOneRequiredWithoutConversationTagNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessageCreateWithoutConversationTagInputObjectSchema),
          z.lazy(
            () => MessageUncheckedCreateWithoutConversationTagInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => MessageCreateOrConnectWithoutConversationTagInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => MessageUpsertWithoutConversationTagInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MessageWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => MessageUpdateWithoutConversationTagInputObjectSchema),
          z.lazy(
            () => MessageUncheckedUpdateWithoutConversationTagInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MessageUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema =
  Schema;
