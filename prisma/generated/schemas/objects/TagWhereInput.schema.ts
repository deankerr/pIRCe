import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { MessageRelationFilterObjectSchema } from './MessageRelationFilter.schema';
import { MessageWhereInputObjectSchema } from './MessageWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TagWhereInputObjectSchema),
        z.lazy(() => TagWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TagWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TagWhereInputObjectSchema),
        z.lazy(() => TagWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    messageID: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    key: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    value: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    message: z
      .union([
        z.lazy(() => MessageRelationFilterObjectSchema),
        z.lazy(() => MessageWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const TagWhereInputObjectSchema = Schema;
