import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateManyInput> = z
  .object({
    id: z.string(),
    label: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    platformID: z.string(),
    feature: z.string().optional().nullable(),
    promptFormat: z.string().optional().nullable(),
  })
  .strict();

export const ModelCreateManyInputObjectSchema = Schema;
