import { z } from 'zod';
import { ModelCreateNestedOneWithoutProfileInputObjectSchema } from './ModelCreateNestedOneWithoutProfileInput.schema';
import { HandlerCreateNestedManyWithoutProfileInputObjectSchema } from './HandlerCreateNestedManyWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateWithoutConversationTagInput> = z
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
    model: z
      .lazy(() => ModelCreateNestedOneWithoutProfileInputObjectSchema)
      .optional(),
    handler: z
      .lazy(() => HandlerCreateNestedManyWithoutProfileInputObjectSchema)
      .optional(),
  })
  .strict();

export const ProfileCreateWithoutConversationTagInputObjectSchema = Schema;
