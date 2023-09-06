import { z } from 'zod';
import { HandlerWhereInputObjectSchema } from './objects/HandlerWhereInput.schema';

export const HandlerDeleteManySchema = z.object({
  where: HandlerWhereInputObjectSchema.optional(),
});
