import { z } from 'zod';
import { ProfileCreateWithoutConversationTagInputObjectSchema } from './ProfileCreateWithoutConversationTagInput.schema';
import { ProfileUncheckedCreateWithoutConversationTagInputObjectSchema } from './ProfileUncheckedCreateWithoutConversationTagInput.schema';
import { ProfileCreateOrConnectWithoutConversationTagInputObjectSchema } from './ProfileCreateOrConnectWithoutConversationTagInput.schema';
import { ProfileUpsertWithoutConversationTagInputObjectSchema } from './ProfileUpsertWithoutConversationTagInput.schema';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileUpdateWithoutConversationTagInputObjectSchema } from './ProfileUpdateWithoutConversationTagInput.schema';
import { ProfileUncheckedUpdateWithoutConversationTagInputObjectSchema } from './ProfileUncheckedUpdateWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutConversationTagNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileCreateWithoutConversationTagInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedCreateWithoutConversationTagInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => ProfileCreateOrConnectWithoutConversationTagInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => ProfileUpsertWithoutConversationTagInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProfileUpdateWithoutConversationTagInputObjectSchema),
          z.lazy(
            () => ProfileUncheckedUpdateWithoutConversationTagInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const ProfileUpdateOneRequiredWithoutConversationTagNestedInputObjectSchema =
  Schema;
