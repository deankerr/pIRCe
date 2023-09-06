import { z } from 'zod';
import { ProfileCreateWithoutHandlerInputObjectSchema } from './ProfileCreateWithoutHandlerInput.schema';
import { ProfileUncheckedCreateWithoutHandlerInputObjectSchema } from './ProfileUncheckedCreateWithoutHandlerInput.schema';
import { ProfileCreateOrConnectWithoutHandlerInputObjectSchema } from './ProfileCreateOrConnectWithoutHandlerInput.schema';
import { ProfileUpsertWithoutHandlerInputObjectSchema } from './ProfileUpsertWithoutHandlerInput.schema';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileUpdateWithoutHandlerInputObjectSchema } from './ProfileUpdateWithoutHandlerInput.schema';
import { ProfileUncheckedUpdateWithoutHandlerInputObjectSchema } from './ProfileUncheckedUpdateWithoutHandlerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpdateOneWithoutHandlerNestedInput> = z
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
    upsert: z
      .lazy(() => ProfileUpsertWithoutHandlerInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ProfileUpdateWithoutHandlerInputObjectSchema),
        z.lazy(() => ProfileUncheckedUpdateWithoutHandlerInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ProfileUpdateOneWithoutHandlerNestedInputObjectSchema = Schema;
