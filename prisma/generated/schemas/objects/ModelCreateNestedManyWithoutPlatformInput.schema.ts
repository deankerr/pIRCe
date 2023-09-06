import { z } from 'zod';
import { ModelCreateWithoutPlatformInputObjectSchema } from './ModelCreateWithoutPlatformInput.schema';
import { ModelUncheckedCreateWithoutPlatformInputObjectSchema } from './ModelUncheckedCreateWithoutPlatformInput.schema';
import { ModelCreateOrConnectWithoutPlatformInputObjectSchema } from './ModelCreateOrConnectWithoutPlatformInput.schema';
import { ModelCreateManyPlatformInputEnvelopeObjectSchema } from './ModelCreateManyPlatformInputEnvelope.schema';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateNestedManyWithoutPlatformInput> = z
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
    createMany: z
      .lazy(() => ModelCreateManyPlatformInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ModelWhereUniqueInputObjectSchema),
        z.lazy(() => ModelWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ModelCreateNestedManyWithoutPlatformInputObjectSchema = Schema;
