import { z } from 'zod';
import { ConversationTagOrderByWithRelationInputObjectSchema } from './objects/ConversationTagOrderByWithRelationInput.schema';
import { ConversationTagWhereInputObjectSchema } from './objects/ConversationTagWhereInput.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './objects/ConversationTagWhereUniqueInput.schema';
import { ConversationTagCountAggregateInputObjectSchema } from './objects/ConversationTagCountAggregateInput.schema';
import { ConversationTagMinAggregateInputObjectSchema } from './objects/ConversationTagMinAggregateInput.schema';
import { ConversationTagMaxAggregateInputObjectSchema } from './objects/ConversationTagMaxAggregateInput.schema';
import { ConversationTagAvgAggregateInputObjectSchema } from './objects/ConversationTagAvgAggregateInput.schema';
import { ConversationTagSumAggregateInputObjectSchema } from './objects/ConversationTagSumAggregateInput.schema';

export const ConversationTagAggregateSchema = z.object({
  orderBy: z
    .union([
      ConversationTagOrderByWithRelationInputObjectSchema,
      ConversationTagOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ConversationTagWhereInputObjectSchema.optional(),
  cursor: ConversationTagWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ConversationTagCountAggregateInputObjectSchema])
    .optional(),
  _min: ConversationTagMinAggregateInputObjectSchema.optional(),
  _max: ConversationTagMaxAggregateInputObjectSchema.optional(),
  _avg: ConversationTagAvgAggregateInputObjectSchema.optional(),
  _sum: ConversationTagSumAggregateInputObjectSchema.optional(),
});
