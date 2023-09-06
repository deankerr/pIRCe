import { z } from 'zod';
import { TagUncheckedCreateNestedManyWithoutMessageInputObjectSchema } from './TagUncheckedCreateNestedManyWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    target: z.string(),
    nick: z.string(),
    type: z.string(),
    content: z.string(),
    self: z.boolean(),
    time: z.coerce.date().optional(),
    mask: z.string(),
    server: z.string(),
    tag: z
      .lazy(() => TagUncheckedCreateNestedManyWithoutMessageInputObjectSchema)
      .optional(),
  })
  .strict();

export const MessageUncheckedCreateInputObjectSchema = Schema;
