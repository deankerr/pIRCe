import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';
import { ModelUpdateWithoutPlatformInputObjectSchema } from './ModelUpdateWithoutPlatformInput.schema';
import { ModelUncheckedUpdateWithoutPlatformInputObjectSchema } from './ModelUncheckedUpdateWithoutPlatformInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUpdateWithWhereUniqueWithoutPlatformInput> =
  z
    .object({
      where: z.lazy(() => ModelWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ModelUpdateWithoutPlatformInputObjectSchema),
        z.lazy(() => ModelUncheckedUpdateWithoutPlatformInputObjectSchema),
      ]),
    })
    .strict();

export const ModelUpdateWithWhereUniqueWithoutPlatformInputObjectSchema =
  Schema;
