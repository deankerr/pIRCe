import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema';
import { MessageOrderByWithRelationInputObjectSchema } from './MessageOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    profileID: z.lazy(() => SortOrderSchema).optional(),
    profileVersion: z.lazy(() => SortOrderSchema).optional(),
    messageID: z.lazy(() => SortOrderSchema).optional(),
    metadata: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    owner: z.lazy(() => ProfileOrderByWithRelationInputObjectSchema).optional(),
    message: z
      .lazy(() => MessageOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict();

export const ConversationTagOrderByWithRelationInputObjectSchema = Schema;
