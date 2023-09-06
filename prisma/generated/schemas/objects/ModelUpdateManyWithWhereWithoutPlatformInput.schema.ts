import { z } from 'zod';
import { ModelScalarWhereInputObjectSchema } from './ModelScalarWhereInput.schema';
import { ModelUpdateManyMutationInputObjectSchema } from './ModelUpdateManyMutationInput.schema';
import { ModelUncheckedUpdateManyWithoutModelInputObjectSchema } from './ModelUncheckedUpdateManyWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUpdateManyWithWhereWithoutPlatformInput> = z
  .object({
    where: z.lazy(() => ModelScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ModelUpdateManyMutationInputObjectSchema),
      z.lazy(() => ModelUncheckedUpdateManyWithoutModelInputObjectSchema),
    ]),
  })
  .strict();

export const ModelUpdateManyWithWhereWithoutPlatformInputObjectSchema = Schema;
