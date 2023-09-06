import { z } from 'zod';
import { MessageCreateWithoutTagInputObjectSchema } from './MessageCreateWithoutTagInput.schema';
import { MessageUncheckedCreateWithoutTagInputObjectSchema } from './MessageUncheckedCreateWithoutTagInput.schema';
import { MessageCreateOrConnectWithoutTagInputObjectSchema } from './MessageCreateOrConnectWithoutTagInput.schema';
import { MessageUpsertWithoutTagInputObjectSchema } from './MessageUpsertWithoutTagInput.schema';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutTagInputObjectSchema } from './MessageUpdateWithoutTagInput.schema';
import { MessageUncheckedUpdateWithoutTagInputObjectSchema } from './MessageUncheckedUpdateWithoutTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageUpdateOneRequiredWithoutTagNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessageCreateWithoutTagInputObjectSchema),
          z.lazy(() => MessageUncheckedCreateWithoutTagInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MessageCreateOrConnectWithoutTagInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => MessageUpsertWithoutTagInputObjectSchema).optional(),
      connect: z.lazy(() => MessageWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => MessageUpdateWithoutTagInputObjectSchema),
          z.lazy(() => MessageUncheckedUpdateWithoutTagInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const MessageUpdateOneRequiredWithoutTagNestedInputObjectSchema = Schema;
