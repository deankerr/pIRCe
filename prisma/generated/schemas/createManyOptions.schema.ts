import { z } from 'zod';
import { OptionsCreateManyInputObjectSchema } from './objects/OptionsCreateManyInput.schema';

export const OptionsCreateManySchema = z.object({
  data: z.union([
    OptionsCreateManyInputObjectSchema,
    z.array(OptionsCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
