import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { MessageUpdateOneRequiredWithoutTagNestedInputObjectSchema } from './MessageUpdateOneRequiredWithoutTagNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagUpdateInput> = z
  .object({
    key: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    value: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    message: z
      .lazy(() => MessageUpdateOneRequiredWithoutTagNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const TagUpdateInputObjectSchema = Schema;
