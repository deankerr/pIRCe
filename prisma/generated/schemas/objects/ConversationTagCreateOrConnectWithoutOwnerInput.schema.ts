import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagCreateWithoutOwnerInputObjectSchema } from './ConversationTagCreateWithoutOwnerInput.schema';
import { ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedCreateWithoutOwnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateOrConnectWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ConversationTagCreateWithoutOwnerInputObjectSchema),
        z.lazy(
          () => ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagCreateOrConnectWithoutOwnerInputObjectSchema =
  Schema;
