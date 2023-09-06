import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TagOrderByRelationAggregateInputObjectSchema } from './TagOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    target: z.lazy(() => SortOrderSchema).optional(),
    nick: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    self: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    mask: z.lazy(() => SortOrderSchema).optional(),
    server: z.lazy(() => SortOrderSchema).optional(),
    tag: z.lazy(() => TagOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const MessageOrderByWithRelationInputObjectSchema = Schema;
