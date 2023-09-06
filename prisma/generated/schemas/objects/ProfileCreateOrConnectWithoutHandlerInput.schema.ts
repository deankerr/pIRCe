import { z } from 'zod';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileCreateWithoutHandlerInputObjectSchema } from './ProfileCreateWithoutHandlerInput.schema';
import { ProfileUncheckedCreateWithoutHandlerInputObjectSchema } from './ProfileUncheckedCreateWithoutHandlerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutHandlerInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutHandlerInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutHandlerInputObjectSchema),
    ]),
  })
  .strict();

export const ProfileCreateOrConnectWithoutHandlerInputObjectSchema = Schema;
