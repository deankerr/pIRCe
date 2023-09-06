import { z } from 'zod';
import { HandlerWhereUniqueInputObjectSchema } from './objects/HandlerWhereUniqueInput.schema';

export const HandlerFindUniqueSchema = z.object({
  where: HandlerWhereUniqueInputObjectSchema,
});
