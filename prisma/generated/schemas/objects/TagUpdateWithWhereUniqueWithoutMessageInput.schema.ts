import { z } from 'zod';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagUpdateWithoutMessageInputObjectSchema } from './TagUpdateWithoutMessageInput.schema';
import { TagUncheckedUpdateWithoutMessageInputObjectSchema } from './TagUncheckedUpdateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutMessageInput> = z
  .object({
    where: z.lazy(() => TagWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TagUpdateWithoutMessageInputObjectSchema),
      z.lazy(() => TagUncheckedUpdateWithoutMessageInputObjectSchema),
    ]),
  })
  .strict();

export const TagUpdateWithWhereUniqueWithoutMessageInputObjectSchema = Schema;
