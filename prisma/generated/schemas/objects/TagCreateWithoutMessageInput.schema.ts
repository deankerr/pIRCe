import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagCreateWithoutMessageInput> = z
  .object({
    key: z.string(),
    value: z.string().optional().nullable(),
  })
  .strict();

export const TagCreateWithoutMessageInputObjectSchema = Schema;
