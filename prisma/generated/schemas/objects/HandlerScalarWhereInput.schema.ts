import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => HandlerScalarWhereInputObjectSchema),
        z.lazy(() => HandlerScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => HandlerScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => HandlerScalarWhereInputObjectSchema),
        z.lazy(() => HandlerScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    allowChannel: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    allowQuery: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    restrictServer: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    restrictTarget: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    restrictAdmin: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    triggerWord: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    triggerType: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    feature: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    profileID: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    overrideOutputTarget: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const HandlerScalarWhereInputObjectSchema = Schema;
