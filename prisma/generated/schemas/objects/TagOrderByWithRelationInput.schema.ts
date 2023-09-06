import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MessageOrderByWithRelationInputObjectSchema } from './MessageOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    messageID: z.lazy(() => SortOrderSchema).optional(),
    key: z.lazy(() => SortOrderSchema).optional(),
    value: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    message: z
      .lazy(() => MessageOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict();

export const TagOrderByWithRelationInputObjectSchema = Schema;
