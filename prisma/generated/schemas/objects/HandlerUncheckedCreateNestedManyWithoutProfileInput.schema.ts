import { z } from 'zod';
import { HandlerCreateWithoutProfileInputObjectSchema } from './HandlerCreateWithoutProfileInput.schema';
import { HandlerUncheckedCreateWithoutProfileInputObjectSchema } from './HandlerUncheckedCreateWithoutProfileInput.schema';
import { HandlerCreateOrConnectWithoutProfileInputObjectSchema } from './HandlerCreateOrConnectWithoutProfileInput.schema';
import { HandlerCreateManyProfileInputEnvelopeObjectSchema } from './HandlerCreateManyProfileInputEnvelope.schema';
import { HandlerWhereUniqueInputObjectSchema } from './HandlerWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerUncheckedCreateNestedManyWithoutProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => HandlerCreateWithoutProfileInputObjectSchema),
          z.lazy(() => HandlerCreateWithoutProfileInputObjectSchema).array(),
          z.lazy(() => HandlerUncheckedCreateWithoutProfileInputObjectSchema),
          z
            .lazy(() => HandlerUncheckedCreateWithoutProfileInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => HandlerCreateOrConnectWithoutProfileInputObjectSchema),
          z
            .lazy(() => HandlerCreateOrConnectWithoutProfileInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => HandlerCreateManyProfileInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => HandlerWhereUniqueInputObjectSchema),
          z.lazy(() => HandlerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const HandlerUncheckedCreateNestedManyWithoutProfileInputObjectSchema =
  Schema;
