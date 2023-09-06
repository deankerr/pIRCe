import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { PlatformUpdateOneRequiredWithoutModelNestedInputObjectSchema } from './PlatformUpdateOneRequiredWithoutModelNestedInput.schema';
import { ProfileUpdateManyWithoutModelNestedInputObjectSchema } from './ProfileUpdateManyWithoutModelNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelUpdateInput> = z
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
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    feature: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    promptFormat: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    platform: z
      .lazy(() => PlatformUpdateOneRequiredWithoutModelNestedInputObjectSchema)
      .optional(),
    profile: z
      .lazy(() => ProfileUpdateManyWithoutModelNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const ModelUpdateInputObjectSchema = Schema;
