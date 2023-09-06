import { z } from 'zod';
import { ModelCreateManyPlatformInputObjectSchema } from './ModelCreateManyPlatformInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ModelCreateManyPlatformInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ModelCreateManyPlatformInputObjectSchema),
      z.lazy(() => ModelCreateManyPlatformInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ModelCreateManyPlatformInputEnvelopeObjectSchema = Schema;
