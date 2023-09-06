import { z } from 'zod';
import { MessageCreateWithoutConversationTagInputObjectSchema } from './MessageCreateWithoutConversationTagInput.schema';
import { MessageUncheckedCreateWithoutConversationTagInputObjectSchema } from './MessageUncheckedCreateWithoutConversationTagInput.schema';
import { MessageCreateOrConnectWithoutConversationTagInputObjectSchema } from './MessageCreateOrConnectWithoutConversationTagInput.schema';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCreateNestedOneWithoutConversationTagInput> =
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
      connect: z.lazy(() => MessageWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const MessageCreateNestedOneWithoutConversationTagInputObjectSchema =
  Schema;
