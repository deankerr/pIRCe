import { z } from 'zod';
import { ModelCreateWithoutProfileInputObjectSchema } from './ModelCreateWithoutProfileInput.schema';
import { ModelUncheckedCreateWithoutProfileInputObjectSchema } from './ModelUncheckedCreateWithoutProfileInput.schema';
import { ModelCreateOrConnectWithoutProfileInputObjectSchema } from './ModelCreateOrConnectWithoutProfileInput.schema';
import { ModelUpsertWithoutProfileInputObjectSchema } from './ModelUpsertWithoutProfileInput.schema';
import { ModelWhereUniqueInputObjectSchema } from './ModelWhereUniqueInput.schema';
import { ModelUpdateWithoutProfileInputObjectSchema } from './ModelUpdateWithoutProfileInput.schema';
import { ModelUncheckedUpdateWithoutProfileInputObjectSchema } from './ModelUncheckedUpdateWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUpdateOneWithoutProfileNestedInput> = z
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
    upsert: z.lazy(() => ModelUpsertWithoutProfileInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ModelWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ModelUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => ModelUncheckedUpdateWithoutProfileInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ModelUpdateOneWithoutProfileNestedInputObjectSchema = Schema;
