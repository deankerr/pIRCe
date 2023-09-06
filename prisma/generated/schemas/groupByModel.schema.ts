import { z } from 'zod';
import { ModelWhereInputObjectSchema } from './objects/ModelWhereInput.schema';
import { ModelOrderByWithAggregationInputObjectSchema } from './objects/ModelOrderByWithAggregationInput.schema';
import { ModelScalarWhereWithAggregatesInputObjectSchema } from './objects/ModelScalarWhereWithAggregatesInput.schema';
import { ModelScalarFieldEnumSchema } from './enums/ModelScalarFieldEnum.schema';

export const ModelGroupBySchema = z.object({
  where: ModelWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ModelOrderByWithAggregationInputObjectSchema,
      ModelOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ModelScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ModelScalarFieldEnumSchema),
});
