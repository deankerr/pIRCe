import { z } from 'zod';
import { PlatformCreateWithoutModelInputObjectSchema } from './PlatformCreateWithoutModelInput.schema';
import { PlatformUncheckedCreateWithoutModelInputObjectSchema } from './PlatformUncheckedCreateWithoutModelInput.schema';
import { PlatformCreateOrConnectWithoutModelInputObjectSchema } from './PlatformCreateOrConnectWithoutModelInput.schema';
import { PlatformWhereUniqueInputObjectSchema } from './PlatformWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformCreateNestedOneWithoutModelInput> = z
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
    connect: z.lazy(() => PlatformWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const PlatformCreateNestedOneWithoutModelInputObjectSchema = Schema;
