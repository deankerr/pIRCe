import { z } from 'zod';
import { PlatformCreateWithoutModelInputObjectSchema } from './PlatformCreateWithoutModelInput.schema';
import { PlatformUncheckedCreateWithoutModelInputObjectSchema } from './PlatformUncheckedCreateWithoutModelInput.schema';
import { PlatformCreateOrConnectWithoutModelInputObjectSchema } from './PlatformCreateOrConnectWithoutModelInput.schema';
import { PlatformUpsertWithoutModelInputObjectSchema } from './PlatformUpsertWithoutModelInput.schema';
import { PlatformWhereUniqueInputObjectSchema } from './PlatformWhereUniqueInput.schema';
import { PlatformUpdateWithoutModelInputObjectSchema } from './PlatformUpdateWithoutModelInput.schema';
import { PlatformUncheckedUpdateWithoutModelInputObjectSchema } from './PlatformUncheckedUpdateWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformUpdateOneRequiredWithoutModelNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PlatformCreateWithoutModelInputObjectSchema),
          z.lazy(() => PlatformUncheckedCreateWithoutModelInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PlatformCreateOrConnectWithoutModelInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => PlatformUpsertWithoutModelInputObjectSchema)
        .optional(),
      connect: z.lazy(() => PlatformWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => PlatformUpdateWithoutModelInputObjectSchema),
          z.lazy(() => PlatformUncheckedUpdateWithoutModelInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const PlatformUpdateOneRequiredWithoutModelNestedInputObjectSchema =
  Schema;
