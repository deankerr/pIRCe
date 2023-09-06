import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';
import { ModelCreateWithoutPlatformInputObjectSchema } from './ModelCreateWithoutPlatformInput.schema';
import { ModelUncheckedCreateWithoutPlatformInputObjectSchema } from './ModelUncheckedCreateWithoutPlatformInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateOrConnectWithoutPlatformInput> = z
  .object({
    where: z.lazy(() => ModelWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ModelCreateWithoutPlatformInputObjectSchema),
      z.lazy(() => ModelUncheckedCreateWithoutPlatformInputObjectSchema),
    ]),
  })
  .strict();

export const ModelCreateOrConnectWithoutPlatformInputObjectSchema = Schema;
