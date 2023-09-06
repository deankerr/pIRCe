import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagCreateManyMessageInput> = z
  .object({
    id: z.number().optional(),
    key: z.string(),
    value: z.string().optional().nullable(),
  })
  .strict();

export const TagCreateManyMessageInputObjectSchema = Schema;
