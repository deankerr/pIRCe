import { z } from 'zod';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileUpdateWithoutModelInputObjectSchema } from './ProfileUpdateWithoutModelInput.schema';
import { ProfileUncheckedUpdateWithoutModelInputObjectSchema } from './ProfileUncheckedUpdateWithoutModelInput.schema';
import { ProfileCreateWithoutModelInputObjectSchema } from './ProfileCreateWithoutModelInput.schema';
import { ProfileUncheckedCreateWithoutModelInputObjectSchema } from './ProfileUncheckedCreateWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpsertWithWhereUniqueWithoutModelInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ProfileUpdateWithoutModelInputObjectSchema),
        z.lazy(() => ProfileUncheckedUpdateWithoutModelInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutModelInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutModelInputObjectSchema),
      ]),
    })
    .strict();

export const ProfileUpsertWithWhereUniqueWithoutModelInputObjectSchema = Schema;
