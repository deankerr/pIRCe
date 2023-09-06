import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagUpdateWithoutMessageInputObjectSchema } from './ConversationTagUpdateWithoutMessageInput.schema';
import { ConversationTagUncheckedUpdateWithoutMessageInputObjectSchema } from './ConversationTagUncheckedUpdateWithoutMessageInput.schema';
import { ConversationTagCreateWithoutMessageInputObjectSchema } from './ConversationTagCreateWithoutMessageInput.schema';
import { ConversationTagUncheckedCreateWithoutMessageInputObjectSchema } from './ConversationTagUncheckedCreateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpsertWithWhereUniqueWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ConversationTagUpdateWithoutMessageInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedUpdateWithoutMessageInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ConversationTagCreateWithoutMessageInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedCreateWithoutMessageInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagUpsertWithWhereUniqueWithoutMessageInputObjectSchema =
  Schema;
