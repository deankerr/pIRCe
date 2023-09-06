import { z } from 'zod';
import { ModelOrderByWithRelationInputObjectSchema } from './objects/ModelOrderByWithRelationInput.schema';
import { ModelWhereInputObjectSchema } from './objects/ModelWhereInput.schema';
import { ModelWhereUniqueInputObjectSchema } from './objects/ModelWhereUniqueInput.schema';
import { ModelScalarFieldEnumSchema } from './enums/ModelScalarFieldEnum.schema';

export const ModelFindManySchema = z.object({
  orderBy: z
    .union([
      ModelOrderByWithRelationInputObjectSchema,
      ModelOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ModelWhereInputObjectSchema.optional(),
  cursor: ModelWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ModelScalarFieldEnumSchema).optional(),
});
