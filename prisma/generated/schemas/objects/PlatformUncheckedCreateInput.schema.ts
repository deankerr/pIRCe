import { z } from 'zod';
import { ModelUncheckedCreateNestedManyWithoutPlatformInputObjectSchema } from './ModelUncheckedCreateNestedManyWithoutPlatformInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformUncheckedCreateInput> = z
  .object({
    id: z.string(),
    label: z.string(),
    apiKey: z.string().optional().nullable(),
    model: z
      .lazy(
        () => ModelUncheckedCreateNestedManyWithoutPlatformInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const PlatformUncheckedCreateInputObjectSchema = Schema;
