import { z } from 'zod';
import { ProfileIdVersionCompoundUniqueInputObjectSchema } from './ProfileIdVersionCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    label: z.string().optional(),
    id_version: z
      .lazy(() => ProfileIdVersionCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const ProfileWhereUniqueInputObjectSchema = Schema;
