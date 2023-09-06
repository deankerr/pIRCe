import { z } from 'zod';
import { MessageCreateNestedOneWithoutTagInputObjectSchema } from './MessageCreateNestedOneWithoutTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagCreateInput> = z
  .object({
    key: z.string(),
    value: z.string().optional().nullable(),
    message: z.lazy(() => MessageCreateNestedOneWithoutTagInputObjectSchema),
  })
  .strict();

export const TagCreateInputObjectSchema = Schema;
