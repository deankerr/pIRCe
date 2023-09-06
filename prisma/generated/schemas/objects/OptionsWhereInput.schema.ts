import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.OptionsWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => OptionsWhereInputObjectSchema),
        z.lazy(() => OptionsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OptionsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OptionsWhereInputObjectSchema),
        z.lazy(() => OptionsWhereInputObjectSchema).array(),
      ])
      .optional(),
    options: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    moderationProfile: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    outputFileURLTemplate: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    outputFileDir: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    outputFilenameIDLength: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    outputIRCMaxNewlines: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    outputIRCMaxChars: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    apiTimeoutMs: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    appName: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    appURL: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const OptionsWhereInputObjectSchema = Schema;
