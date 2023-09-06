import { z } from 'zod';
import { ModelWhereUniqueInputObjectSchema } from './objects/ModelWhereUniqueInput.schema';
import { ModelCreateInputObjectSchema } from './objects/ModelCreateInput.schema';
import { ModelUncheckedCreateInputObjectSchema } from './objects/ModelUncheckedCreateInput.schema';
import { ModelUpdateInputObjectSchema } from './objects/ModelUpdateInput.schema';
import { ModelUncheckedUpdateInputObjectSchema } from './objects/ModelUncheckedUpdateInput.schema';

export const ModelUpsertSchema = z.object({
  where: ModelWhereUniqueInputObjectSchema,
  create: z.union([
    ModelCreateInputObjectSchema,
    ModelUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ModelUpdateInputObjectSchema,
    ModelUncheckedUpdateInputObjectSchema,
  ]),
});
