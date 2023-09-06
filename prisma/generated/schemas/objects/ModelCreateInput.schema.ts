import { z } from 'zod';
import { PlatformCreateNestedOneWithoutModelInputObjectSchema } from './PlatformCreateNestedOneWithoutModelInput.schema';
import { ProfileCreateNestedManyWithoutModelInputObjectSchema } from './ProfileCreateNestedManyWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateInput> = z
  .object({
    id: z.string(),
    label: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    feature: z.string().optional().nullable(),
    promptFormat: z.string().optional().nullable(),
    platform: z.lazy(
      () => PlatformCreateNestedOneWithoutModelInputObjectSchema,
    ),
    profile: z
      .lazy(() => ProfileCreateNestedManyWithoutModelInputObjectSchema)
      .optional(),
  })
  .strict();

export const ModelCreateInputObjectSchema = Schema;
