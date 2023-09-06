import { z } from 'zod';
import { ModelOrderByWithRelationInputObjectSchema } from './objects/ModelOrderByWithRelationInput.schema';
import { ModelWhereInputObjectSchema } from './objects/ModelWhereInput.schema';
import { ModelWhereUniqueInputObjectSchema } from './objects/ModelWhereUniqueInput.schema';
import { ModelCountAggregateInputObjectSchema } from './objects/ModelCountAggregateInput.schema';
import { ModelMinAggregateInputObjectSchema } from './objects/ModelMinAggregateInput.schema';
import { ModelMaxAggregateInputObjectSchema } from './objects/ModelMaxAggregateInput.schema';

export const ModelAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), ModelCountAggregateInputObjectSchema])
    .optional(),
  _min: ModelMinAggregateInputObjectSchema.optional(),
  _max: ModelMaxAggregateInputObjectSchema.optional(),
});
