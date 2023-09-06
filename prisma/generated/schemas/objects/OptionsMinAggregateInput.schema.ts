import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsMinAggregateInputType> = z
  .object({
    options: z.literal(true).optional(),
    moderationProfile: z.literal(true).optional(),
    outputFileURLTemplate: z.literal(true).optional(),
    outputFileDir: z.literal(true).optional(),
    outputFilenameIDLength: z.literal(true).optional(),
    outputIRCMaxNewlines: z.literal(true).optional(),
    outputIRCMaxChars: z.literal(true).optional(),
    apiTimeoutMs: z.literal(true).optional(),
    appName: z.literal(true).optional(),
    appURL: z.literal(true).optional(),
  })
  .strict();

export const OptionsMinAggregateInputObjectSchema = Schema;
