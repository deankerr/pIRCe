import { z } from 'zod';
import { ModelWhereInputObjectSchema } from './objects/ModelWhereInput.schema';

export const ModelDeleteManySchema = z.object({
  where: ModelWhereInputObjectSchema.optional(),
});
