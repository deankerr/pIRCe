import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ProfileUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutConversationTagNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateWithoutMessageInput> = z
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
  })
  .strict();

export const ConversationTagUpdateWithoutMessageInputObjectSchema = Schema;
