import { z } from 'zod';
import { HandlerOrderByWithRelationInputObjectSchema } from './objects/HandlerOrderByWithRelationInput.schema';
import { HandlerWhereInputObjectSchema } from './objects/HandlerWhereInput.schema';
import { HandlerWhereUniqueInputObjectSchema } from './objects/HandlerWhereUniqueInput.schema';
import { HandlerCountAggregateInputObjectSchema } from './objects/HandlerCountAggregateInput.schema';
import { HandlerMinAggregateInputObjectSchema } from './objects/HandlerMinAggregateInput.schema';
import { HandlerMaxAggregateInputObjectSchema } from './objects/HandlerMaxAggregateInput.schema';
import { HandlerAvgAggregateInputObjectSchema } from './objects/HandlerAvgAggregateInput.schema';
import { HandlerSumAggregateInputObjectSchema } from './objects/HandlerSumAggregateInput.schema';

export const HandlerAggregateSchema = z.object({
  orderBy: z
    .union([
      HandlerOrderByWithRelationInputObjectSchema,
      HandlerOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: HandlerWhereInputObjectSchema.optional(),
  cursor: HandlerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), HandlerCountAggregateInputObjectSchema])
    .optional(),
  _min: HandlerMinAggregateInputObjectSchema.optional(),
  _max: HandlerMaxAggregateInputObjectSchema.optional(),
  _avg: HandlerAvgAggregateInputObjectSchema.optional(),
  _sum: HandlerSumAggregateInputObjectSchema.optional(),
});
