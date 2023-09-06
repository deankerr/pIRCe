import { z } from 'zod';
import { HandlerWhereUniqueInputObjectSchema } from './HandlerWhereUniqueInput.schema';
import { HandlerUpdateWithoutProfileInputObjectSchema } from './HandlerUpdateWithoutProfileInput.schema';
import { HandlerUncheckedUpdateWithoutProfileInputObjectSchema } from './HandlerUncheckedUpdateWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerUpdateWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => HandlerWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => HandlerUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => HandlerUncheckedUpdateWithoutProfileInputObjectSchema),
      ]),
    })
    .strict();

export const HandlerUpdateWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema;
