import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformCreateManyInput> = z
  .object({
    id: z.string(),
    label: z.string(),
    apiKey: z.string().optional().nullable(),
  })
  .strict();

export const PlatformCreateManyInputObjectSchema = Schema;
