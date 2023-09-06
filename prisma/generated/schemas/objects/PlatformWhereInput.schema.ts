import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { ModelListRelationFilterObjectSchema } from './ModelListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PlatformWhereInputObjectSchema),
        z.lazy(() => PlatformWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PlatformWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PlatformWhereInputObjectSchema),
        z.lazy(() => PlatformWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    label: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    apiKey: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    model: z.lazy(() => ModelListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const PlatformWhereInputObjectSchema = Schema;
