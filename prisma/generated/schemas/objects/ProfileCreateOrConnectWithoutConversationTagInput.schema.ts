import { z } from 'zod';
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema';
import { ProfileCreateWithoutConversationTagInputObjectSchema } from './ProfileCreateWithoutConversationTagInput.schema';
import { ProfileUncheckedCreateWithoutConversationTagInputObjectSchema } from './ProfileUncheckedCreateWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutConversationTagInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutConversationTagInputObjectSchema),
        z.lazy(
          () => ProfileUncheckedCreateWithoutConversationTagInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ProfileCreateOrConnectWithoutConversationTagInputObjectSchema =
  Schema;
