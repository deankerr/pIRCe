import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutHandlerInput> = z
  .object({
    id: z.number().optional(),
    version: z.number().optional(),
    label: z.string(),
    description: z.string().optional().nullable(),
    parameters: z.string().optional(),
    modelID: z.string().optional().nullable(),
    platformID: z.string().optional().nullable(),
    mainPrompt: z.string().optional().nullable(),
    examplePrompt: z.string().optional().nullable(),
    postPrompt: z.string().optional().nullable(),
    postPromptOffset: z.number().optional().nullable(),
    maxHistoryLength: z.number().optional().nullable(),
    maxLocalIRCLength: z.number().optional().nullable(),
  })
  .strict();

export const ProfileUncheckedCreateWithoutHandlerInputObjectSchema = Schema;
