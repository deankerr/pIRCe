import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagUpdateWithoutMessageInputObjectSchema } from './ConversationTagUpdateWithoutMessageInput.schema';
import { ConversationTagUncheckedUpdateWithoutMessageInputObjectSchema } from './ConversationTagUncheckedUpdateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateWithWhereUniqueWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ConversationTagUpdateWithoutMessageInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedUpdateWithoutMessageInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagUpdateWithWhereUniqueWithoutMessageInputObjectSchema =
  Schema;
