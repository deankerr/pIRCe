import { z } from 'zod';
import { ProfileCreateNestedManyWithoutModelInputObjectSchema } from './ProfileCreateNestedManyWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateWithoutPlatformInput> = z
  .object({
    id: z.string(),
    label: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    feature: z.string().optional().nullable(),
    promptFormat: z.string().optional().nullable(),
    profile: z
      .lazy(() => ProfileCreateNestedManyWithoutModelInputObjectSchema)
      .optional(),
  })
  .strict();

export const ModelCreateWithoutPlatformInputObjectSchema = Schema;
