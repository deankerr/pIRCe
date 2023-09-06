import { z } from 'zod';
import { HandlerWhereUniqueInputObjectSchema } from './HandlerWhereUniqueInput.schema';
import { HandlerUpdateWithoutProfileInputObjectSchema } from './HandlerUpdateWithoutProfileInput.schema';
import { HandlerUncheckedUpdateWithoutProfileInputObjectSchema } from './HandlerUncheckedUpdateWithoutProfileInput.schema';
import { HandlerCreateWithoutProfileInputObjectSchema } from './HandlerCreateWithoutProfileInput.schema';
import { HandlerUncheckedCreateWithoutProfileInputObjectSchema } from './HandlerUncheckedCreateWithoutProfileInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerUpsertWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => HandlerWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => HandlerUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => HandlerUncheckedUpdateWithoutProfileInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => HandlerCreateWithoutProfileInputObjectSchema),
        z.lazy(() => HandlerUncheckedCreateWithoutProfileInputObjectSchema),
      ]),
    })
    .strict();

export const HandlerUpsertWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema;
