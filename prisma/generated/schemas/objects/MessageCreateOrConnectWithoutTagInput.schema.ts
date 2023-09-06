import { z } from 'zod';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageCreateWithoutTagInputObjectSchema } from './MessageCreateWithoutTagInput.schema';
import { MessageUncheckedCreateWithoutTagInputObjectSchema } from './MessageUncheckedCreateWithoutTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCreateOrConnectWithoutTagInput> = z
  .object({
    where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MessageCreateWithoutTagInputObjectSchema),
      z.lazy(() => MessageUncheckedCreateWithoutTagInputObjectSchema),
    ]),
  })
  .strict();

export const MessageCreateOrConnectWithoutTagInputObjectSchema = Schema;
