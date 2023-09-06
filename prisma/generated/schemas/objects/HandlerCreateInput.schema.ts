import { z } from 'zod';
import { ProfileCreateNestedOneWithoutHandlerInputObjectSchema } from './ProfileCreateNestedOneWithoutHandlerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.HandlerCreateInput> = z
  .object({
    allowChannel: z.boolean().optional(),
    allowQuery: z.boolean().optional(),
    restrictServer: z.string().optional().nullable(),
    restrictTarget: z.string().optional().nullable(),
    restrictAdmin: z.boolean().optional(),
    triggerWord: z.string().optional().nullable(),
    triggerType: z.string().optional(),
    feature: z.string().optional().nullable(),
    overrideOutputTarget: z.string().optional().nullable(),
    profile: z
      .lazy(() => ProfileCreateNestedOneWithoutHandlerInputObjectSchema)
      .optional(),
  })
  .strict();

export const HandlerCreateInputObjectSchema = Schema;
