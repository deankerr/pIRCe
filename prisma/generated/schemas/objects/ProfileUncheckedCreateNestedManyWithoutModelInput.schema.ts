import { z } from 'zod';
import { ProfileCreateWithoutModelInputObjectSchema } from './ProfileCreateWithoutModelInput.schema';
import { ProfileUncheckedCreateWithoutModelInputObjectSchema } from './ProfileUncheckedCreateWithoutModelInput.schema';
import { ProfileCreateOrConnectWithoutModelInputObjectSchema } from './ProfileCreateOrConnectWithoutModelInput.schema';
import { ProfileCreateManyModelInputEnvelopeObjectSchema } from './ProfileCreateManyModelInputEnvelope.schema';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUncheckedCreateNestedManyWithoutModelInput> =
  z
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
      createMany: z
        .lazy(() => ProfileCreateManyModelInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProfileWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ProfileUncheckedCreateNestedManyWithoutModelInputObjectSchema =
  Schema;
