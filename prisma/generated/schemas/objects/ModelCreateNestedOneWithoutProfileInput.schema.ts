import { z } from 'zod';
import { ModelCreateWithoutProfileInputObjectSchema } from './ModelCreateWithoutProfileInput.schema';
import { ModelUncheckedCreateWithoutProfileInputObjectSchema } from './ModelUncheckedCreateWithoutProfileInput.schema';
import { ModelCreateOrConnectWithoutProfileInputObjectSchema } from './ModelCreateOrConnectWithoutProfileInput.schema';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateNestedOneWithoutProfileInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ModelCreateWithoutProfileInputObjectSchema),
        z.lazy(() => ModelUncheckedCreateWithoutProfileInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ModelCreateOrConnectWithoutProfileInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ModelWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ModelCreateNestedOneWithoutProfileInputObjectSchema = Schema;
