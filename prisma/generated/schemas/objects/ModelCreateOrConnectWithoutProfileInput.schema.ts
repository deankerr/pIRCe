import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';
import { ModelCreateWithoutProfileInputObjectSchema } from './ModelCreateWithoutProfileInput.schema';
import { ModelUncheckedCreateWithoutProfileInputObjectSchema } from './ModelUncheckedCreateWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateOrConnectWithoutProfileInput> = z
  .object({
    where: z.lazy(() => ModelWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ModelCreateWithoutProfileInputObjectSchema),
      z.lazy(() => ModelUncheckedCreateWithoutProfileInputObjectSchema),
    ]),
  })
  .strict();

export const ModelCreateOrConnectWithoutProfileInputObjectSchema = Schema;
