import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsSumAggregateInputType> = z
  .object({
    outputFilenameIDLength: z.literal(true).optional(),
    outputIRCMaxNewlines: z.literal(true).optional(),
    outputIRCMaxChars: z.literal(true).optional(),
    apiTimeoutMs: z.literal(true).optional(),
  })
  .strict();

export const OptionsSumAggregateInputObjectSchema = Schema;
