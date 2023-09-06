import { z } from 'zod';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileUpdateWithoutModelInputObjectSchema } from './ProfileUpdateWithoutModelInput.schema';
import { ProfileUncheckedUpdateWithoutModelInputObjectSchema } from './ProfileUncheckedUpdateWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpdateWithWhereUniqueWithoutModelInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ProfileUpdateWithoutModelInputObjectSchema),
        z.lazy(() => ProfileUncheckedUpdateWithoutModelInputObjectSchema),
      ]),
    })
    .strict();

export const ProfileUpdateWithWhereUniqueWithoutModelInputObjectSchema = Schema;
