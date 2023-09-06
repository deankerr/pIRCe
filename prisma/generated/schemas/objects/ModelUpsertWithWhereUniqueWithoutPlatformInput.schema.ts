import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';
import { ModelUpdateWithoutPlatformInputObjectSchema } from './ModelUpdateWithoutPlatformInput.schema';
import { ModelUncheckedUpdateWithoutPlatformInputObjectSchema } from './ModelUncheckedUpdateWithoutPlatformInput.schema';
import { ModelCreateWithoutPlatformInputObjectSchema } from './ModelCreateWithoutPlatformInput.schema';
import { ModelUncheckedCreateWithoutPlatformInputObjectSchema } from './ModelUncheckedCreateWithoutPlatformInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUpsertWithWhereUniqueWithoutPlatformInput> =
  z
    .object({
      where: z.lazy(() => ModelWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ModelUpdateWithoutPlatformInputObjectSchema),
        z.lazy(() => ModelUncheckedUpdateWithoutPlatformInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ModelCreateWithoutPlatformInputObjectSchema),
        z.lazy(() => ModelUncheckedCreateWithoutPlatformInputObjectSchema),
      ]),
    })
    .strict();

export const ModelUpsertWithWhereUniqueWithoutPlatformInputObjectSchema =
  Schema;
