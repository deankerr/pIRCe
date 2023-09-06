import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { ProfileRelationFilterObjectSchema } from './ProfileRelationFilter.schema';
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema';
import { MessageRelationFilterObjectSchema } from './MessageRelationFilter.schema';
import { MessageWhereInputObjectSchema } from './MessageWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ConversationTagWhereInputObjectSchema),
        z.lazy(() => ConversationTagWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ConversationTagWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ConversationTagWhereInputObjectSchema),
        z.lazy(() => ConversationTagWhereInputObjectSchema).array(),
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
    owner: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional(),
    message: z
      .union([
        z.lazy(() => MessageRelationFilterObjectSchema),
        z.lazy(() => MessageWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ConversationTagWhereInputObjectSchema = Schema;
