import { z } from 'zod';
import { PlatformUpdateWithoutModelInputObjectSchema } from './PlatformUpdateWithoutModelInput.schema';
import { PlatformUncheckedUpdateWithoutModelInputObjectSchema } from './PlatformUncheckedUpdateWithoutModelInput.schema';
import { PlatformCreateWithoutModelInputObjectSchema } from './PlatformCreateWithoutModelInput.schema';
import { PlatformUncheckedCreateWithoutModelInputObjectSchema } from './PlatformUncheckedCreateWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformUpsertWithoutModelInput> = z
  .object({
    update: z.union([
      z.lazy(() => PlatformUpdateWithoutModelInputObjectSchema),
      z.lazy(() => PlatformUncheckedUpdateWithoutModelInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PlatformCreateWithoutModelInputObjectSchema),
      z.lazy(() => PlatformUncheckedCreateWithoutModelInputObjectSchema),
    ]),
  })
  .strict();

export const PlatformUpsertWithoutModelInputObjectSchema = Schema;
