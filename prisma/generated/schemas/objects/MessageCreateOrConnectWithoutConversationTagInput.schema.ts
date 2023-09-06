import { z } from 'zod';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageCreateWithoutConversationTagInputObjectSchema } from './MessageCreateWithoutConversationTagInput.schema';
import { MessageUncheckedCreateWithoutConversationTagInputObjectSchema } from './MessageUncheckedCreateWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCreateOrConnectWithoutConversationTagInput> =
  z
    .object({
      where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MessageCreateWithoutConversationTagInputObjectSchema),
        z.lazy(
          () => MessageUncheckedCreateWithoutConversationTagInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const MessageCreateOrConnectWithoutConversationTagInputObjectSchema =
  Schema;
