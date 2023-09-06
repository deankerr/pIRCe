import { z } from 'zod';
import { ConversationTagCreateWithoutOwnerInputObjectSchema } from './ConversationTagCreateWithoutOwnerInput.schema';
import { ConversationTagUncheckedCreateWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedCreateWithoutOwnerInput.schema';
import { ConversationTagCreateOrConnectWithoutOwnerInputObjectSchema } from './ConversationTagCreateOrConnectWithoutOwnerInput.schema';
import { ConversationTagUpsertWithWhereUniqueWithoutOwnerInputObjectSchema } from './ConversationTagUpsertWithWhereUniqueWithoutOwnerInput.schema';
import { ConversationTagCreateManyOwnerInputEnvelopeObjectSchema } from './ConversationTagCreateManyOwnerInputEnvelope.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './ConversationTagWhereUniqueInput.schema';
import { ConversationTagUpdateWithWhereUniqueWithoutOwnerInputObjectSchema } from './ConversationTagUpdateWithWhereUniqueWithoutOwnerInput.schema';
import { ConversationTagUpdateManyWithWhereWithoutOwnerInputObjectSchema } from './ConversationTagUpdateManyWithWhereWithoutOwnerInput.schema';
import { ConversationTagScalarWhereInputObjectSchema } from './ConversationTagScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUncheckedUpdateManyWithoutOwnerNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              ConversationTagUpsertWithWhereUniqueWithoutOwnerInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUpsertWithWhereUniqueWithoutOwnerInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ConversationTagCreateManyOwnerInputEnvelopeObjectSchema)
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
              ConversationTagUpdateWithWhereUniqueWithoutOwnerInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUpdateWithWhereUniqueWithoutOwnerInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ConversationTagUpdateManyWithWhereWithoutOwnerInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ConversationTagUpdateManyWithWhereWithoutOwnerInputObjectSchema,
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

export const ConversationTagUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema =
  Schema;
