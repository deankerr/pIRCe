import { z } from 'zod';
import { HandlerUpdateInputObjectSchema } from './objects/HandlerUpdateInput.schema';
import { HandlerUncheckedUpdateInputObjectSchema } from './objects/HandlerUncheckedUpdateInput.schema';
import { HandlerWhereUniqueInputObjectSchema } from './objects/HandlerWhereUniqueInput.schema';

export const HandlerUpdateOneSchema = z.object({
  data: z.union([
    HandlerUpdateInputObjectSchema,
    HandlerUncheckedUpdateInputObjectSchema,
  ]),
  where: HandlerWhereUniqueInputObjectSchema,
});
