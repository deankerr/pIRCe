import { z } from 'zod';
import { PlatformWhereUniqueInputObjectSchema } from './PlatformWhereUniqueInput.schema';
import { PlatformCreateWithoutModelInputObjectSchema } from './PlatformCreateWithoutModelInput.schema';
import { PlatformUncheckedCreateWithoutModelInputObjectSchema } from './PlatformUncheckedCreateWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformCreateOrConnectWithoutModelInput> = z
  .object({
    where: z.lazy(() => PlatformWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PlatformCreateWithoutModelInputObjectSchema),
      z.lazy(() => PlatformUncheckedCreateWithoutModelInputObjectSchema),
    ]),
  })
  .strict();

export const PlatformCreateOrConnectWithoutModelInputObjectSchema = Schema;
