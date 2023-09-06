import { z } from 'zod';
import { WordListOrderByWithRelationInputObjectSchema } from './objects/WordListOrderByWithRelationInput.schema';
import { WordListWhereInputObjectSchema } from './objects/WordListWhereInput.schema';
import { WordListWhereUniqueInputObjectSchema } from './objects/WordListWhereUniqueInput.schema';
import { WordListCountAggregateInputObjectSchema } from './objects/WordListCountAggregateInput.schema';
import { WordListMinAggregateInputObjectSchema } from './objects/WordListMinAggregateInput.schema';
import { WordListMaxAggregateInputObjectSchema } from './objects/WordListMaxAggregateInput.schema';

export const WordListAggregateSchema = z.object({
  orderBy: z
    .union([
      WordListOrderByWithRelationInputObjectSchema,
      WordListOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: WordListWhereInputObjectSchema.optional(),
  cursor: WordListWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), WordListCountAggregateInputObjectSchema])
    .optional(),
  _min: WordListMinAggregateInputObjectSchema.optional(),
  _max: WordListMaxAggregateInputObjectSchema.optional(),
});
