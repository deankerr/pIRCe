import { z } from 'zod';
import { HandlerScalarWhereInputObjectSchema } from './HandlerScalarWhereInput.schema';
import { HandlerUpdateManyMutationInputObjectSchema } from './HandlerUpdateManyMutationInput.schema';
import { HandlerUncheckedUpdateManyWithoutHandlerInputObjectSchema } from './HandlerUncheckedUpdateManyWithoutHandlerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerUpdateManyWithWhereWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => HandlerScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => HandlerUpdateManyMutationInputObjectSchema),
        z.lazy(() => HandlerUncheckedUpdateManyWithoutHandlerInputObjectSchema),
      ]),
    })
    .strict();

export const HandlerUpdateManyWithWhereWithoutProfileInputObjectSchema = Schema;
