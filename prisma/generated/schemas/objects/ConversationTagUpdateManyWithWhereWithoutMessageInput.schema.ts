import { z } from 'zod';
import { ConversationTagScalarWhereInputObjectSchema } from './ConversationTagScalarWhereInput.schema';
import { ConversationTagUpdateManyMutationInputObjectSchema } from './ConversationTagUpdateManyMutationInput.schema';
import { ConversationTagUncheckedUpdateManyWithoutConversationTagInputObjectSchema } from './ConversationTagUncheckedUpdateManyWithoutConversationTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConversationTagUpdateManyWithWhereWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ConversationTagScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ConversationTagUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ConversationTagUncheckedUpdateManyWithoutConversationTagInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ConversationTagUpdateManyWithWhereWithoutMessageInputObjectSchema =
  Schema;
