import { z } from 'zod';
import { ProfileUncheckedCreateNestedManyWithoutModelInputObjectSchema } from './ProfileUncheckedCreateNestedManyWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUncheckedCreateWithoutPlatformInput> = z
  .object({
    id: z.string(),
    label: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    feature: z.string().optional().nullable(),
    promptFormat: z.string().optional().nullable(),
    profile: z
      .lazy(() => ProfileUncheckedCreateNestedManyWithoutModelInputObjectSchema)
      .optional(),
  })
  .strict();

export const ModelUncheckedCreateWithoutPlatformInputObjectSchema = Schema;
