import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelIdPlatformIDCompoundUniqueInput> = z
  .object({
    id: z.string(),
    platformID: z.string(),
  })
  .strict();

export const ModelIdPlatformIDCompoundUniqueInputObjectSchema = Schema;
