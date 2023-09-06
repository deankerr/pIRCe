import { z } from 'zod';
import { TagMessageIDKeyCompoundUniqueInputObjectSchema } from './TagMessageIDKeyCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    messageID_key: z
      .lazy(() => TagMessageIDKeyCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const TagWhereUniqueInputObjectSchema = Schema;
