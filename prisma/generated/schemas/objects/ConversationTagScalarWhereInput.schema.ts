import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ConversationTagScalarWhereInputObjectSchema),
        z.lazy(() => ConversationTagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ConversationTagScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ConversationTagScalarWhereInputObjectSchema),
        z.lazy(() => ConversationTagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    profileID: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    profileVersion: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    messageID: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    metadata: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const ConversationTagScalarWhereInputObjectSchema = Schema;
