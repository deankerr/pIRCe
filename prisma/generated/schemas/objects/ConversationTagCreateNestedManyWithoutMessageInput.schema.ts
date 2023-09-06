import { z } from 'zod';
import { ConversationTagCreateWithoutMessageInputObjectSchema } from './ConversationTagCreateWithoutMessageInput.schema';
import { ConversationTagUncheckedCreateWithoutMessageInputObjectSchema } from './ConversationTagUncheckedCreateWithoutMessageInput.schema';
import { ConversationTagCreateOrConnectWithoutMessageInputObjectSchema } from './ConversationTagCreateOrConnectWithoutMessageInput.schema';
import { ConversationTagCreateManyMessageInputEnvelopeObjectSchema } from './ConversationTagCreateManyMessageInputEnvelope.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagCreateNestedManyWithoutMessageInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ConversationTagCreateWithoutMessageInputObjectSchema),
          z
            .lazy(() => ConversationTagCreateWithoutMessageInputObjectSchema)
            .array(),
          z.lazy(
            () => ConversationTagUncheckedCreateWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUncheckedCreateWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ConversationTagCreateOrConnectWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagCreateOrConnectWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConversationTagCreateManyMessageInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConversationTagCreateNestedManyWithoutMessageInputObjectSchema =
  Schema;
