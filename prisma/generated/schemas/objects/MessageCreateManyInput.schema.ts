import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessageCreateManyInput> = z
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
  })
  .strict();

export const MessageCreateManyInputObjectSchema = Schema;
