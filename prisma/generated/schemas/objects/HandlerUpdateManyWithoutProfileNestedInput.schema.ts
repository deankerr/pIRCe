import { z } from 'zod';
import { HandlerCreateWithoutProfileInputObjectSchema } from './HandlerCreateWithoutProfileInput.schema';
import { HandlerUncheckedCreateWithoutProfileInputObjectSchema } from './HandlerUncheckedCreateWithoutProfileInput.schema';
import { HandlerCreateOrConnectWithoutProfileInputObjectSchema } from './HandlerCreateOrConnectWithoutProfileInput.schema';
import { HandlerUpsertWithWhereUniqueWithoutProfileInputObjectSchema } from './HandlerUpsertWithWhereUniqueWithoutProfileInput.schema';
import { HandlerCreateManyProfileInputEnvelopeObjectSchema } from './HandlerCreateManyProfileInputEnvelope.schema';
import { HandlerWhereUniqueInputObjectSchema } from './HandlerWhereUniqueInput.schema';
import { HandlerUpdateWithWhereUniqueWithoutProfileInputObjectSchema } from './HandlerUpdateWithWhereUniqueWithoutProfileInput.schema';
import { HandlerUpdateManyWithWhereWithoutProfileInputObjectSchema } from './HandlerUpdateManyWithWhereWithoutProfileInput.schema';
import { HandlerScalarWhereInputObjectSchema } from './HandlerScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerUpdateManyWithoutProfileNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(
          () => HandlerUpsertWithWhereUniqueWithoutProfileInputObjectSchema,
        ),
        z
          .lazy(
            () => HandlerUpsertWithWhereUniqueWithoutProfileInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => HandlerCreateManyProfileInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => HandlerWhereUniqueInputObjectSchema),
        z.lazy(() => HandlerWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => HandlerWhereUniqueInputObjectSchema),
        z.lazy(() => HandlerWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => HandlerWhereUniqueInputObjectSchema),
        z.lazy(() => HandlerWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => HandlerWhereUniqueInputObjectSchema),
        z.lazy(() => HandlerWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => HandlerUpdateWithWhereUniqueWithoutProfileInputObjectSchema,
        ),
        z
          .lazy(
            () => HandlerUpdateWithWhereUniqueWithoutProfileInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => HandlerUpdateManyWithWhereWithoutProfileInputObjectSchema),
        z
          .lazy(() => HandlerUpdateManyWithWhereWithoutProfileInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => HandlerScalarWhereInputObjectSchema),
        z.lazy(() => HandlerScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const HandlerUpdateManyWithoutProfileNestedInputObjectSchema = Schema;
