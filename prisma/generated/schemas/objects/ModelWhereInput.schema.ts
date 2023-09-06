import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { PlatformRelationFilterObjectSchema } from './PlatformRelationFilter.schema';
import { PlatformWhereInputObjectSchema } from './PlatformWhereInput.schema';
import { ProfileListRelationFilterObjectSchema } from './ProfileListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ModelWhereInputObjectSchema),
        z.lazy(() => ModelWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ModelWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ModelWhereInputObjectSchema),
        z.lazy(() => ModelWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    label: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    platformID: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    feature: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    promptFormat: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    platform: z
      .union([
        z.lazy(() => PlatformRelationFilterObjectSchema),
        z.lazy(() => PlatformWhereInputObjectSchema),
      ])
      .optional(),
    profile: z.lazy(() => ProfileListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const ModelWhereInputObjectSchema = Schema;
