import { z } from 'zod';
import { HandlerUpdateManyMutationInputObjectSchema } from './objects/HandlerUpdateManyMutationInput.schema';
import { HandlerWhereInputObjectSchema } from './objects/HandlerWhereInput.schema';

export const HandlerUpdateManySchema = z.object({
  data: HandlerUpdateManyMutationInputObjectSchema,
  where: HandlerWhereInputObjectSchema.optional(),
});
