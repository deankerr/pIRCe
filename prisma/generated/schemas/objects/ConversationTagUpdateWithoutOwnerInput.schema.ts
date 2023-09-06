import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { MessageUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema } from './MessageUpdateOneRequiredWithoutConversationTagNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateWithoutOwnerInput> = z
  .object({
    metadata: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    message: z
      .lazy(
        () =>
          MessageUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ConversationTagUpdateWithoutOwnerInputObjectSchema = Schema;
