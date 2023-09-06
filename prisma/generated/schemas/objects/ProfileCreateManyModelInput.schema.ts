import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateManyModelInput> = z
  .object({
    id: z.number().optional(),
    version: z.number().optional(),
    label: z.string(),
    description: z.string().optional().nullable(),
    parameters: z.string().optional(),
    mainPrompt: z.string().optional().nullable(),
    examplePrompt: z.string().optional().nullable(),
    postPrompt: z.string().optional().nullable(),
    postPromptOffset: z.number().optional().nullable(),
    maxHistoryLength: z.number().optional().nullable(),
    maxLocalIRCLength: z.number().optional().nullable(),
  })
  .strict();

export const ProfileCreateManyModelInputObjectSchema = Schema;
