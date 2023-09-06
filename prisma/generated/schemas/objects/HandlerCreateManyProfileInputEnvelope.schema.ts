import { z } from 'zod';
import { HandlerCreateManyProfileInputObjectSchema } from './HandlerCreateManyProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerCreateManyProfileInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => HandlerCreateManyProfileInputObjectSchema),
      z.lazy(() => HandlerCreateManyProfileInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const HandlerCreateManyProfileInputEnvelopeObjectSchema = Schema;
