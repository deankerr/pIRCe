import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsCreateInput> = z
  .object({
    options: z.string().optional(),
    moderationProfile: z.string().optional(),
    outputFileURLTemplate: z.string().optional(),
    outputFileDir: z.string().optional(),
    outputFilenameIDLength: z.number().optional(),
    outputIRCMaxNewlines: z.number().optional(),
    outputIRCMaxChars: z.number().optional(),
    apiTimeoutMs: z.number().optional(),
    appName: z.string().optional(),
    appURL: z.string().optional(),
  })
  .strict();

export const OptionsCreateInputObjectSchema = Schema;
