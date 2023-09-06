import { z } from 'zod';
import { OptionsWhereInputObjectSchema } from './objects/OptionsWhereInput.schema';

export const OptionsDeleteManySchema = z.object({
  where: OptionsWhereInputObjectSchema.optional(),
});
