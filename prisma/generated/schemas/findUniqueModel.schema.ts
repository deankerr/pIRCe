import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './objects/ModelWhereUniqueInput.schema';

export const ModelFindUniqueSchema = z.object({
  where: ModelWhereUniqueInputObjectSchema,
});
