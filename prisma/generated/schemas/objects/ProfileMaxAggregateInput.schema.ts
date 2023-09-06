import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    version: z.literal(true).optional(),
    label: z.literal(true).optional(),
    description: z.literal(true).optional(),
    parameters: z.literal(true).optional(),
    modelID: z.literal(true).optional(),
    platformID: z.literal(true).optional(),
    mainPrompt: z.literal(true).optional(),
    examplePrompt: z.literal(true).optional(),
    postPrompt: z.literal(true).optional(),
    postPromptOffset: z.literal(true).optional(),
    maxHistoryLength: z.literal(true).optional(),
    maxLocalIRCLength: z.literal(true).optional(),
  })
  .strict();

export const ProfileMaxAggregateInputObjectSchema = Schema;
