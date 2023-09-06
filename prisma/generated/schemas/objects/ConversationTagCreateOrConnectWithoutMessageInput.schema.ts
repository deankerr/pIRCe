import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagCreateWithoutMessageInputObjectSchema } from './ConversationTagCreateWithoutMessageInput.schema';
import { ConversationTagUncheckedCreateWithoutMessageInputObjectSchema } from './ConversationTagUncheckedCreateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateOrConnectWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ConversationTagCreateWithoutMessageInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedCreateWithoutMessageInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagCreateOrConnectWithoutMessageInputObjectSchema =
  Schema;
