import { z } from 'zod';
import { HandlerCreateManyInputObjectSchema } from './objects/HandlerCreateManyInput.schema';

export const HandlerCreateManySchema = z.object({
  data: z.union([
    HandlerCreateManyInputObjectSchema,
    z.array(HandlerCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
