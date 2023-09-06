import { z } from 'zod';
import { ModelUpdateWithoutProfileInputObjectSchema } from './ModelUpdateWithoutProfileInput.schema';
import { ModelUncheckedUpdateWithoutProfileInputObjectSchema } from './ModelUncheckedUpdateWithoutProfileInput.schema';
import { ModelCreateWithoutProfileInputObjectSchema } from './ModelCreateWithoutProfileInput.schema';
import { ModelUncheckedCreateWithoutProfileInputObjectSchema } from './ModelUncheckedCreateWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUpsertWithoutProfileInput> = z
  .object({
    update: z.union([
      z.lazy(() => ModelUpdateWithoutProfileInputObjectSchema),
      z.lazy(() => ModelUncheckedUpdateWithoutProfileInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ModelCreateWithoutProfileInputObjectSchema),
      z.lazy(() => ModelUncheckedCreateWithoutProfileInputObjectSchema),
    ]),
  })
  .strict();

export const ModelUpsertWithoutProfileInputObjectSchema = Schema;
