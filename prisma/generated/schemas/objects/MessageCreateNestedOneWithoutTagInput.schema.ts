import { z } from 'zod';
import { MessageCreateWithoutTagInputObjectSchema } from './MessageCreateWithoutTagInput.schema';
import { MessageUncheckedCreateWithoutTagInputObjectSchema } from './MessageUncheckedCreateWithoutTagInput.schema';
import { MessageCreateOrConnectWithoutTagInputObjectSchema } from './MessageCreateOrConnectWithoutTagInput.schema';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCreateNestedOneWithoutTagInput> = z
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
    connect: z.lazy(() => MessageWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MessageCreateNestedOneWithoutTagInputObjectSchema = Schema;
