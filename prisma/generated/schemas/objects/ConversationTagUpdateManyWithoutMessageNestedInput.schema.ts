import { z } from 'zod';
import { ConversationTagCreateWithoutMessageInputObjectSchema } from './ConversationTagCreateWithoutMessageInput.schema';
import { ConversationTagUncheckedCreateWithoutMessageInputObjectSchema } from './ConversationTagUncheckedCreateWithoutMessageInput.schema';
import { ConversationTagCreateOrConnectWithoutMessageInputObjectSchema } from './ConversationTagCreateOrConnectWithoutMessageInput.schema';
import { ConversationTagUpsertWithWhereUniqueWithoutMessageInputObjectSchema } from './ConversationTagUpsertWithWhereUniqueWithoutMessageInput.schema';
import { ConversationTagCreateManyMessageInputEnvelopeObjectSchema } from './ConversationTagCreateManyMessageInputEnvelope.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagUpdateWithWhereUniqueWithoutMessageInputObjectSchema } from './ConversationTagUpdateWithWhereUniqueWithoutMessageInput.schema';
import { ConversationTagUpdateManyWithWhereWithoutMessageInputObjectSchema } from './ConversationTagUpdateManyWithWhereWithoutMessageInput.schema';
import { ConversationTagScalarWhereInputObjectSchema } from './ConversationTagScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateManyWithoutMessageNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              ConversationTagUpsertWithWhereUniqueWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUpsertWithWhereUniqueWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConversationTagCreateManyMessageInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema),
          z.lazy(() => ConversationTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ConversationTagUpdateWithWhereUniqueWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUpdateWithWhereUniqueWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ConversationTagUpdateManyWithWhereWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUpdateManyWithWhereWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ConversationTagScalarWhereInputObjectSchema),
          z.lazy(() => ConversationTagScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ConversationTagUpdateManyWithoutMessageNestedInputObjectSchema =
  Schema;
