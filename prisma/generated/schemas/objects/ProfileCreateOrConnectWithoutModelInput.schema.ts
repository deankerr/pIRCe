import { z } from 'zod';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileCreateWithoutModelInputObjectSchema } from './ProfileCreateWithoutModelInput.schema';
import { ProfileUncheckedCreateWithoutModelInputObjectSchema } from './ProfileUncheckedCreateWithoutModelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutModelInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutModelInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutModelInputObjectSchema),
    ]),
  })
  .strict();

export const ProfileCreateOrConnectWithoutModelInputObjectSchema = Schema;
