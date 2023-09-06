import { z } from 'zod';
import { ModelIdPlatformIDCompoundUniqueInputObjectSchema } from './ModelIdPlatformIDCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelWhereUniqueInput> = z
  .object({
    id_platformID: z
      .lazy(() => ModelIdPlatformIDCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const ModelWhereUniqueInputObjectSchema = Schema;
