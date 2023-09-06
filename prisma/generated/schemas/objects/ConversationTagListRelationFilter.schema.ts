import { z } from 'zod';
import { ConversationTagWhereInputObjectSchema } from './ConversationTagWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagListRelationFilter> = z
  .object({
    every: z.lazy(() => ConversationTagWhereInputObjectSchema).optional(),
    some: z.lazy(() => ConversationTagWhereInputObjectSchema).optional(),
    none: z.lazy(() => ConversationTagWhereInputObjectSchema).optional(),
  })
  .strict();

export const ConversationTagListRelationFilterObjectSchema = Schema;
