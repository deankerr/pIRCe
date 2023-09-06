import { z } from 'zod';
import { ModelCreateInputObjectSchema } from './objects/ModelCreateInput.schema';
import { ModelUncheckedCreateInputObjectSchema } from './objects/ModelUncheckedCreateInput.schema';

export const ModelCreateOneSchema = z.object({
  data: z.union([
    ModelCreateInputObjectSchema,
    ModelUncheckedCreateInputObjectSchema,
  ]),
});
