import { z } from 'zod';
import { ProfileUpdateWithoutConversationTagInputObjectSchema } from './ProfileUpdateWithoutConversationTagInput.schema';
import { ProfileUncheckedUpdateWithoutConversationTagInputObjectSchema } from './ProfileUncheckedUpdateWithoutConversationTagInput.schema';
import { ProfileCreateWithoutConversationTagInputObjectSchema } from './ProfileCreateWithoutConversationTagInput.schema';
import { ProfileUncheckedCreateWithoutConversationTagInputObjectSchema } from './ProfileUncheckedCreateWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutConversationTagInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutConversationTagInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedUpdateWithoutConversationTagInputObjectSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutConversationTagInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedCreateWithoutConversationTagInputObjectSchema,
      ),
    ]),
  })
  .strict();

export const ProfileUpsertWithoutConversationTagInputObjectSchema = Schema;
