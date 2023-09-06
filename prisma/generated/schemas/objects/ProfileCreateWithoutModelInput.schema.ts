import { z } from 'zod';
import { HandlerCreateNestedManyWithoutProfileInputObjectSchema } from './HandlerCreateNestedManyWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateWithoutModelInput> = z
  .object({
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
    handler: z
      .lazy(() => HandlerCreateNestedManyWithoutProfileInputObjectSchema)
      .optional(),
  })
  .strict();

export const ProfileCreateWithoutModelInputObjectSchema = Schema;
