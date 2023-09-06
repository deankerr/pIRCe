import { z } from 'zod';
import { ProfileCreateWithoutConversationTagInputObjectSchema } from './ProfileCreateWithoutConversationTagInput.schema';
import { ProfileUncheckedCreateWithoutConversationTagInputObjectSchema } from './ProfileUncheckedCreateWithoutConversationTagInput.schema';
import { ProfileCreateOrConnectWithoutConversationTagInputObjectSchema } from './ProfileCreateOrConnectWithoutConversationTagInput.schema';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutConversationTagInput> =
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
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ProfileCreateNestedOneWithoutConversationTagInputObjectSchema =
  Schema;
