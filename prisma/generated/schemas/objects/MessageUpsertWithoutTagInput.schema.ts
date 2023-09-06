import { z } from 'zod';
import { MessageUpdateWithoutTagInputObjectSchema } from './MessageUpdateWithoutTagInput.schema';
import { MessageUncheckedUpdateWithoutTagInputObjectSchema } from './MessageUncheckedUpdateWithoutTagInput.schema';
import { MessageCreateWithoutTagInputObjectSchema } from './MessageCreateWithoutTagInput.schema';
import { MessageUncheckedCreateWithoutTagInputObjectSchema } from './MessageUncheckedCreateWithoutTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageUpsertWithoutTagInput> = z
  .object({
    update: z.union([
      z.lazy(() => MessageUpdateWithoutTagInputObjectSchema),
      z.lazy(() => MessageUncheckedUpdateWithoutTagInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MessageCreateWithoutTagInputObjectSchema),
      z.lazy(() => MessageUncheckedCreateWithoutTagInputObjectSchema),
    ]),
  })
  .strict();

export const MessageUpsertWithoutTagInputObjectSchema = Schema;
