import { z } from 'zod';
import { ProfileCreateWithoutHandlerInputObjectSchema } from './ProfileCreateWithoutHandlerInput.schema';
import { ProfileUncheckedCreateWithoutHandlerInputObjectSchema } from './ProfileUncheckedCreateWithoutHandlerInput.schema';
import { ProfileCreateOrConnectWithoutHandlerInputObjectSchema } from './ProfileCreateOrConnectWithoutHandlerInput.schema';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutHandlerInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutHandlerInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutHandlerInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutHandlerInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ProfileCreateNestedOneWithoutHandlerInputObjectSchema = Schema;
