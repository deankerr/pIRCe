import { z } from 'zod';
import { HandlerCreateInputObjectSchema } from './objects/HandlerCreateInput.schema';
import { HandlerUncheckedCreateInputObjectSchema } from './objects/HandlerUncheckedCreateInput.schema';

export const HandlerCreateOneSchema = z.object({
  data: z.union([
    HandlerCreateInputObjectSchema,
    HandlerUncheckedCreateInputObjectSchema,
  ]),
});
