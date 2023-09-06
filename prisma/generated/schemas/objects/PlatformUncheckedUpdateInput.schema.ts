import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ModelUncheckedUpdateManyWithoutPlatformNestedInputObjectSchema } from './ModelUncheckedUpdateManyWithoutPlatformNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PlatformUncheckedUpdateInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    label: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    apiKey: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    model: z
      .lazy(
        () => ModelUncheckedUpdateManyWithoutPlatformNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const PlatformUncheckedUpdateInputObjectSchema = Schema;
