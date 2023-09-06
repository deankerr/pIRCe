import { z } from 'zod';
import { ConversationTagCreateWithoutOwnerInputObjectSchema } from './ConversationTagCreateWithoutOwnerInput.schema';
import { ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedCreateWithoutOwnerInput.schema';
import { ConversationTagCreateOrConnectWithoutOwnerInputObjectSchema } from './ConversationTagCreateOrConnectWithoutOwnerInput.schema';
import { ConversationTagCreateManyOwnerInputEnvelopeObjectSchema } from './ConversationTagCreateManyOwnerInputEnvelope.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateNestedManyWithoutOwnerInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ConversationTagCreateWithoutOwnerInputObjectSchema),
          z
            .lazy(() => ConversationTagCreateWithoutOwnerInputObjectSchema)
            .array(),
          z.lazy(
            () => ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema,
          ),
          z
            .lazy(
              () => ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ConversationTagCreateOrConnectWithoutOwnerInputObjectSchema,
          ),
          z
            .lazy(
              () => ConversationTagCreateOrConnectWithoutOwnerInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConversationTagCreateManyOwnerInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConversationTagCreateNestedManyWithoutOwnerInputObjectSchema =
  Schema;
