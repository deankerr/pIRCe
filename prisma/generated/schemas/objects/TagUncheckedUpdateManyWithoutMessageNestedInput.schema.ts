import { z } from 'zod';
import { TagCreateWithoutMessageInputObjectSchema } from './TagCreateWithoutMessageInput.schema';
import { TagUncheckedCreateWithoutMessageInputObjectSchema } from './TagUncheckedCreateWithoutMessageInput.schema';
import { TagCreateOrConnectWithoutMessageInputObjectSchema } from './TagCreateOrConnectWithoutMessageInput.schema';
import { TagUpsertWithWhereUniqueWithoutMessageInputObjectSchema } from './TagUpsertWithWhereUniqueWithoutMessageInput.schema';
import { TagCreateManyMessageInputEnvelopeObjectSchema } from './TagCreateManyMessageInputEnvelope.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagUpdateWithWhereUniqueWithoutMessageInputObjectSchema } from './TagUpdateWithWhereUniqueWithoutMessageInput.schema';
import { TagUpdateManyWithWhereWithoutMessageInputObjectSchema } from './TagUpdateManyWithWhereWithoutMessageInput.schema';
import { TagScalarWhereInputObjectSchema } from './TagScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutMessageNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutMessageInputObjectSchema),
          z.lazy(() => TagCreateWithoutMessageInputObjectSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutMessageInputObjectSchema),
          z
            .lazy(() => TagUncheckedCreateWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutMessageInputObjectSchema),
          z
            .lazy(() => TagCreateOrConnectWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutMessageInputObjectSchema),
          z
            .lazy(() => TagUpsertWithWhereUniqueWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TagCreateManyMessageInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TagWhereUniqueInputObjectSchema),
          z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TagWhereUniqueInputObjectSchema),
          z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TagWhereUniqueInputObjectSchema),
          z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TagWhereUniqueInputObjectSchema),
          z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutMessageInputObjectSchema),
          z
            .lazy(() => TagUpdateWithWhereUniqueWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutMessageInputObjectSchema),
          z
            .lazy(() => TagUpdateManyWithWhereWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TagScalarWhereInputObjectSchema),
          z.lazy(() => TagScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TagUncheckedUpdateManyWithoutMessageNestedInputObjectSchema =
  Schema;
