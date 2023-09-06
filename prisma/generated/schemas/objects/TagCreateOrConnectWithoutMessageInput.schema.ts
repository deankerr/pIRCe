import { z } from 'zod';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagCreateWithoutMessageInputObjectSchema } from './TagCreateWithoutMessageInput.schema';
import { TagUncheckedCreateWithoutMessageInputObjectSchema } from './TagUncheckedCreateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagCreateOrConnectWithoutMessageInput> = z
  .object({
    where: z.lazy(() => TagWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TagCreateWithoutMessageInputObjectSchema),
      z.lazy(() => TagUncheckedCreateWithoutMessageInputObjectSchema),
    ]),
  })
  .strict();

export const TagCreateOrConnectWithoutMessageInputObjectSchema = Schema;
