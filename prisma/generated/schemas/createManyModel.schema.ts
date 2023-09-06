import { z } from 'zod';
import { ModelCreateManyInputObjectSchema } from './objects/ModelCreateManyInput.schema';

export const ModelCreateManySchema = z.object({
  data: z.union([
    ModelCreateManyInputObjectSchema,
    z.array(ModelCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
