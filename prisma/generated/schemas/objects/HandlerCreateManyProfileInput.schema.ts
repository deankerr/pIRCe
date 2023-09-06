import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerCreateManyProfileInput> = z
  .object({
    id: z.number().optional(),
    allowChannel: z.boolean().optional(),
    allowQuery: z.boolean().optional(),
    restrictServer: z.string().optional().nullable(),
    restrictTarget: z.string().optional().nullable(),
    restrictAdmin: z.boolean().optional(),
    triggerWord: z.string().optional().nullable(),
    triggerType: z.string().optional(),
    feature: z.string().optional().nullable(),
    overrideOutputTarget: z.string().optional().nullable(),
  })
  .strict();

export const HandlerCreateManyProfileInputObjectSchema = Schema;
