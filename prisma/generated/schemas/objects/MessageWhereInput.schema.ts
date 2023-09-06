import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ConversationTagListRelationFilterObjectSchema } from './ConversationTagListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MessageWhereInputObjectSchema),
        z.lazy(() => MessageWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MessageWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MessageWhereInputObjectSchema),
        z.lazy(() => MessageWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    target: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    nick: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    type: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    content: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    self: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    time: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    mask: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    server: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    conversationTag: z
      .lazy(() => ConversationTagListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();

export const MessageWhereInputObjectSchema = Schema;
