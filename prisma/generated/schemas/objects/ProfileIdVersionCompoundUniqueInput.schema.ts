import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileIdVersionCompoundUniqueInput> = z
  .object({
    id: z.number(),
    version: z.number(),
  })
  .strict();

export const ProfileIdVersionCompoundUniqueInputObjectSchema = Schema;
