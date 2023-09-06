import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { ModelRelationFilterObjectSchema } from './ModelRelationFilter.schema';
import { ModelWhereInputObjectSchema } from './ModelWhereInput.schema';
import { HandlerListRelationFilterObjectSchema } from './HandlerListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProfileWhereInputObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProfileWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProfileWhereInputObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    version: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    label: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    parameters: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    modelID: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    platformID: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    mainPrompt: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    examplePrompt: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    postPrompt: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    postPromptOffset: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    maxHistoryLength: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    maxLocalIRCLength: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    model: z
      .union([
        z.lazy(() => ModelRelationFilterObjectSchema),
        z.lazy(() => ModelWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    handler: z.lazy(() => HandlerListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const ProfileWhereInputObjectSchema = Schema;
