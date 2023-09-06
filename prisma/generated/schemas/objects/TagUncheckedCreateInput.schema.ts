import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    messageID: z.number(),
    key: z.string(),
    value: z.string().optional().nullable(),
  })
  .strict();

export const TagUncheckedCreateInputObjectSchema = Schema;
