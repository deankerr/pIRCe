import { z } from 'zod';
import { ModelUpdateManyMutationInputObjectSchema } from './objects/ModelUpdateManyMutationInput.schema';
import { ModelWhereInputObjectSchema } from './objects/ModelWhereInput.schema';

export const ModelUpdateManySchema = z.object({
  data: ModelUpdateManyMutationInputObjectSchema,
  where: ModelWhereInputObjectSchema.optional(),
});
