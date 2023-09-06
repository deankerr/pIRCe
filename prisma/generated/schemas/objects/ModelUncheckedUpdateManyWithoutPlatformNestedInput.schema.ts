import { z } from 'zod';
import { ModelCreateWithoutPlatformInputObjectSchema } from './ModelCreateWithoutPlatformInput.schema';
import { ModelUncheckedCreateWithoutPlatformInputObjectSchema } from './ModelUncheckedCreateWithoutPlatformInput.schema';
import { ModelCreateOrConnectWithoutPlatformInputObjectSchema } from './ModelCreateOrConnectWithoutPlatformInput.schema';
import { ModelUpsertWithWhereUniqueWithoutPlatformInputObjectSchema } from './ModelUpsertWithWhereUniqueWithoutPlatformInput.schema';
import { ModelCreateManyPlatformInputEnvelopeObjectSchema } from './ModelCreateManyPlatformInputEnvelope.schema';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';
import { ModelUpdateWithWhereUniqueWithoutPlatformInputObjectSchema } from './ModelUpdateWithWhereUniqueWithoutPlatformInput.schema';
import { ModelUpdateManyWithWhereWithoutPlatformInputObjectSchema } from './ModelUpdateManyWithWhereWithoutPlatformInput.schema';
import { ModelScalarWhereInputObjectSchema } from './ModelScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUncheckedUpdateManyWithoutPlatformNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ModelCreateWithoutPlatformInputObjectSchema),
          z.lazy(() => ModelCreateWithoutPlatformInputObjectSchema).array(),
          z.lazy(() => ModelUncheckedCreateWithoutPlatformInputObjectSchema),
          z
            .lazy(() => ModelUncheckedCreateWithoutPlatformInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ModelCreateOrConnectWithoutPlatformInputObjectSchema),
          z
            .lazy(() => ModelCreateOrConnectWithoutPlatformInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ModelUpsertWithWhereUniqueWithoutPlatformInputObjectSchema,
          ),
          z
            .lazy(
              () => ModelUpsertWithWhereUniqueWithoutPlatformInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ModelCreateManyPlatformInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ModelWhereUniqueInputObjectSchema),
          z.lazy(() => ModelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ModelWhereUniqueInputObjectSchema),
          z.lazy(() => ModelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ModelWhereUniqueInputObjectSchema),
          z.lazy(() => ModelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ModelWhereUniqueInputObjectSchema),
          z.lazy(() => ModelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ModelUpdateWithWhereUniqueWithoutPlatformInputObjectSchema,
          ),
          z
            .lazy(
              () => ModelUpdateWithWhereUniqueWithoutPlatformInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ModelUpdateManyWithWhereWithoutPlatformInputObjectSchema,
          ),
          z
            .lazy(
              () => ModelUpdateManyWithWhereWithoutPlatformInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ModelScalarWhereInputObjectSchema),
          z.lazy(() => ModelScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ModelUncheckedUpdateManyWithoutPlatformNestedInputObjectSchema =
  Schema;
