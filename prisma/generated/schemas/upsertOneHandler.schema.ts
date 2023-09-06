import { z } from 'zod';
import { HandlerWhereUniqueInputObjectSchema } from './objects/HandlerWhereUniqueInput.schema';
import { HandlerCreateInputObjectSchema } from './objects/HandlerCreateInput.schema';
import { HandlerUncheckedCreateInputObjectSchema } from './objects/HandlerUncheckedCreateInput.schema';
import { HandlerUpdateInputObjectSchema } from './objects/HandlerUpdateInput.schema';
import { HandlerUncheckedUpdateInputObjectSchema } from './objects/HandlerUncheckedUpdateInput.schema';

export const HandlerUpsertSchema = z.object({
  where: HandlerWhereUniqueInputObjectSchema,
  create: z.union([
    HandlerCreateInputObjectSchema,
    HandlerUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    HandlerUpdateInputObjectSchema,
    HandlerUncheckedUpdateInputObjectSchema,
  ]),
});
