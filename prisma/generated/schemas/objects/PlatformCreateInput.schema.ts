import { z } from 'zod';
import { ModelCreateNestedManyWithoutPlatformInputObjectSchema } from './ModelCreateNestedManyWithoutPlatformInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformCreateInput> = z
  .object({
    id: z.string(),
    label: z.string(),
    apiKey: z.string().optional().nullable(),
    model: z
      .lazy(() => ModelCreateNestedManyWithoutPlatformInputObjectSchema)
      .optional(),
  })
  .strict();

export const PlatformCreateInputObjectSchema = Schema;
