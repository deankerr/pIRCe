import { z } from 'zod';
import { TagCreateManyMessageInputObjectSchema } from './TagCreateManyMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagCreateManyMessageInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TagCreateManyMessageInputObjectSchema),
      z.lazy(() => TagCreateManyMessageInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TagCreateManyMessageInputEnvelopeObjectSchema = Schema;
