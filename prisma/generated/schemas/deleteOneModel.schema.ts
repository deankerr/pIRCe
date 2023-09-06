import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './objects/ModelWhereUniqueInput.schema';

export const ModelDeleteOneSchema = z.object({
  where: ModelWhereUniqueInputObjectSchema,
});
