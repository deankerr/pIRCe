import { z } from 'zod';
import { HandlerUncheckedCreateNestedManyWithoutProfileInputObjectSchema } from './HandlerUncheckedCreateNestedManyWithoutProfileInput.schema';
import { ConversationTagUncheckedCreateNestedManyWithoutOwnerInputObjectSchema } from './ConversationTagUncheckedCreateNestedManyWithoutOwnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutModelInput> = z
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
    handler: z
      .lazy(
        () => HandlerUncheckedCreateNestedManyWithoutProfileInputObjectSchema,
      )
      .optional(),
    conversationTag: z
      .lazy(
        () =>
          ConversationTagUncheckedCreateNestedManyWithoutOwnerInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ProfileUncheckedCreateWithoutModelInputObjectSchema = Schema;
