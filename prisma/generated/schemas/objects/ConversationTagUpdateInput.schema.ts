import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ProfileUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutConversationTagNestedInput.schema';
import { MessageUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema } from './MessageUpdateOneRequiredWithoutConversationTagNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateInput> = z
  .object({
    metadata: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    owner: z
      .lazy(
        () =>
          ProfileUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema,
      )
      .optional(),
    message: z
      .lazy(
        () =>
          MessageUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ConversationTagUpdateInputObjectSchema = Schema;
