import { z } from 'zod';
import { ModelUpdateInputObjectSchema } from './objects/ModelUpdateInput.schema';
import { ModelUncheckedUpdateInputObjectSchema } from './objects/ModelUncheckedUpdateInput.schema';
import { ModelWhereUniqueInputObjectSchema } from './objects/ModelWhereUniqueInput.schema';

export const ModelUpdateOneSchema = z.object({
  data: z.union([
    ModelUpdateInputObjectSchema,
    ModelUncheckedUpdateInputObjectSchema,
  ]),
  where: ModelWhereUniqueInputObjectSchema,
});
