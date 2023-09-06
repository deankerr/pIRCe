import { z } from 'zod';
import { TagScalarWhereInputObjectSchema } from './TagScalarWhereInput.schema';
import { TagUpdateManyMutationInputObjectSchema } from './TagUpdateManyMutationInput.schema';
import { TagUncheckedUpdateManyWithoutTagInputObjectSchema } from './TagUncheckedUpdateManyWithoutTagInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutMessageInput> = z
  .object({
    where: z.lazy(() => TagScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TagUpdateManyMutationInputObjectSchema),
      z.lazy(() => TagUncheckedUpdateManyWithoutTagInputObjectSchema),
    ]),
  })
  .strict();

export const TagUpdateManyWithWhereWithoutMessageInputObjectSchema = Schema;
