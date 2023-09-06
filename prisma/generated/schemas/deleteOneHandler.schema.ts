import { z } from 'zod';
import { HandlerWhereUniqueInputObjectSchema } from './objects/HandlerWhereUniqueInput.schema';

export const HandlerDeleteOneSchema = z.object({
  where: HandlerWhereUniqueInputObjectSchema,
});
