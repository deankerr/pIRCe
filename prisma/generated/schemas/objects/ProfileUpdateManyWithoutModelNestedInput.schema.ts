import { z } from 'zod';
import { ProfileCreateWithoutModelInputObjectSchema } from './ProfileCreateWithoutModelInput.schema';
import { ProfileUncheckedCreateWithoutModelInputObjectSchema } from './ProfileUncheckedCreateWithoutModelInput.schema';
import { ProfileCreateOrConnectWithoutModelInputObjectSchema } from './ProfileCreateOrConnectWithoutModelInput.schema';
import { ProfileUpsertWithWhereUniqueWithoutModelInputObjectSchema } from './ProfileUpsertWithWhereUniqueWithoutModelInput.schema';
import { ProfileCreateManyModelInputEnvelopeObjectSchema } from './ProfileCreateManyModelInputEnvelope.schema';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileUpdateWithWhereUniqueWithoutModelInputObjectSchema } from './ProfileUpdateWithWhereUniqueWithoutModelInput.schema';
import { ProfileUpdateManyWithWhereWithoutModelInputObjectSchema } from './ProfileUpdateManyWithWhereWithoutModelInput.schema';
import { ProfileScalarWhereInputObjectSchema } from './ProfileScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpdateManyWithoutModelNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutModelInputObjectSchema),
        z.lazy(() => ProfileCreateWithoutModelInputObjectSchema).array(),
        z.lazy(() => ProfileUncheckedCreateWithoutModelInputObjectSchema),
        z
          .lazy(() => ProfileUncheckedCreateWithoutModelInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProfileCreateOrConnectWithoutModelInputObjectSchema),
        z
          .lazy(() => ProfileCreateOrConnectWithoutModelInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ProfileUpsertWithWhereUniqueWithoutModelInputObjectSchema),
        z
          .lazy(() => ProfileUpsertWithWhereUniqueWithoutModelInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ProfileCreateManyModelInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ProfileUpdateWithWhereUniqueWithoutModelInputObjectSchema),
        z
          .lazy(() => ProfileUpdateWithWhereUniqueWithoutModelInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ProfileUpdateManyWithWhereWithoutModelInputObjectSchema),
        z
          .lazy(() => ProfileUpdateManyWithWhereWithoutModelInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ProfileScalarWhereInputObjectSchema),
        z.lazy(() => ProfileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ProfileUpdateManyWithoutModelNestedInputObjectSchema = Schema;
