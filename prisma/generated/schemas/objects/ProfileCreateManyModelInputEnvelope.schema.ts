import { z } from 'zod';
import { ProfileCreateManyModelInputObjectSchema } from './ProfileCreateManyModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateManyModelInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ProfileCreateManyModelInputObjectSchema),
      z.lazy(() => ProfileCreateManyModelInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProfileCreateManyModelInputEnvelopeObjectSchema = Schema;
