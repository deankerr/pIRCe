import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagUpdateWithoutOwnerInputObjectSchema } from './ConversationTagUpdateWithoutOwnerInput.schema';
import { ConversationTagUncheckedUpdateWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedUpdateWithoutOwnerInput.schema';
import { ConversationTagCreateWithoutOwnerInputObjectSchema } from './ConversationTagCreateWithoutOwnerInput.schema';
import { ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedCreateWithoutOwnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpsertWithWhereUniqueWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ConversationTagUpdateWithoutOwnerInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedUpdateWithoutOwnerInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ConversationTagCreateWithoutOwnerInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagUpsertWithWhereUniqueWithoutOwnerInputObjectSchema =
  Schema;
