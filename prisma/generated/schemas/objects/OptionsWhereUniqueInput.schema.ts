import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsWhereUniqueInput> = z
  .object({
    options: z.string().optional(),
  })
  .strict();

export const OptionsWhereUniqueInputObjectSchema = Schema;
