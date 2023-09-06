import { z } from 'zod';
import { OptionsUpdateManyMutationInputObjectSchema } from './objects/OptionsUpdateManyMutationInput.schema';
import { OptionsWhereInputObjectSchema } from './objects/OptionsWhereInput.schema';

export const OptionsUpdateManySchema = z.object({
  data: OptionsUpdateManyMutationInputObjectSchema,
  where: OptionsWhereInputObjectSchema.optional(),
});
