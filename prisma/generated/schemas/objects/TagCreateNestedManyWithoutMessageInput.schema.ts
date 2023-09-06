import { z } from 'zod';
import { TagCreateWithoutMessageInputObjectSchema } from './TagCreateWithoutMessageInput.schema';
import { TagUncheckedCreateWithoutMessageInputObjectSchema } from './TagUncheckedCreateWithoutMessageInput.schema';
import { TagCreateOrConnectWithoutMessageInputObjectSchema } from './TagCreateOrConnectWithoutMessageInput.schema';
import { TagCreateManyMessageInputEnvelopeObjectSchema } from './TagCreateManyMessageInputEnvelope.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TagCreateNestedManyWithoutMessageInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TagCreateWithoutMessageInputObjectSchema),
        z.lazy(() => TagCreateWithoutMessageInputObjectSchema).array(),
        z.lazy(() => TagUncheckedCreateWithoutMessageInputObjectSchema),
        z.lazy(() => TagUncheckedCreateWithoutMessageInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TagCreateOrConnectWithoutMessageInputObjectSchema),
        z.lazy(() => TagCreateOrConnectWithoutMessageInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => TagCreateManyMessageInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => TagWhereUniqueInputObjectSchema),
        z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TagCreateNestedManyWithoutMessageInputObjectSchema = Schema;
