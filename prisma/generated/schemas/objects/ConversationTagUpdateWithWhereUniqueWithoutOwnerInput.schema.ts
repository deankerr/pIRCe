import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagUpdateWithoutOwnerInputObjectSchema } from './ConversationTagUpdateWithoutOwnerInput.schema';
import { ConversationTagUncheckedUpdateWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedUpdateWithoutOwnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateWithWhereUniqueWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ConversationTagUpdateWithoutOwnerInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedUpdateWithoutOwnerInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagUpdateWithWhereUniqueWithoutOwnerInputObjectSchema =
  Schema;
