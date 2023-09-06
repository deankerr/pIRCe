import { z } from 'zod';
import { ProfileUpdateWithoutHandlerInputObjectSchema } from './ProfileUpdateWithoutHandlerInput.schema';
import { ProfileUncheckedUpdateWithoutHandlerInputObjectSchema } from './ProfileUncheckedUpdateWithoutHandlerInput.schema';
import { ProfileCreateWithoutHandlerInputObjectSchema } from './ProfileCreateWithoutHandlerInput.schema';
import { ProfileUncheckedCreateWithoutHandlerInputObjectSchema } from './ProfileUncheckedCreateWithoutHandlerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutHandlerInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutHandlerInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutHandlerInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutHandlerInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutHandlerInputObjectSchema),
    ]),
  })
  .strict();

export const ProfileUpsertWithoutHandlerInputObjectSchema = Schema;
