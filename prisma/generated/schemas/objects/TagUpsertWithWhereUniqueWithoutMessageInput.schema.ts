import { z } from 'zod';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagUpdateWithoutMessageInputObjectSchema } from './TagUpdateWithoutMessageInput.schema';
import { TagUncheckedUpdateWithoutMessageInputObjectSchema } from './TagUncheckedUpdateWithoutMessageInput.schema';
import { TagCreateWithoutMessageInputObjectSchema } from './TagCreateWithoutMessageInput.schema';
import { TagUncheckedCreateWithoutMessageInputObjectSchema } from './TagUncheckedCreateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutMessageInput> = z
  .object({
    where: z.lazy(() => TagWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TagUpdateWithoutMessageInputObjectSchema),
      z.lazy(() => TagUncheckedUpdateWithoutMessageInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TagCreateWithoutMessageInputObjectSchema),
      z.lazy(() => TagUncheckedCreateWithoutMessageInputObjectSchema),
    ]),
  })
  .strict();

export const TagUpsertWithWhereUniqueWithoutMessageInputObjectSchema = Schema;
