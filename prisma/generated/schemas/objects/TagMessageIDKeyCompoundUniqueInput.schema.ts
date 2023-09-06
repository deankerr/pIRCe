import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagMessageIDKeyCompoundUniqueInput> = z
  .object({
    messageID: z.number(),
    key: z.string(),
  })
  .strict();

export const TagMessageIDKeyCompoundUniqueInputObjectSchema = Schema;
