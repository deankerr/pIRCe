import { z } from 'zod';
import { WordListWhereInputObjectSchema } from './objects/WordListWhereInput.schema';
import { WordListOrderByWithAggregationInputObjectSchema } from './objects/WordListOrderByWithAggregationInput.schema';
import { WordListScalarWhereWithAggregatesInputObjectSchema } from './objects/WordListScalarWhereWithAggregatesInput.schema';
import { WordListScalarFieldEnumSchema } from './enums/WordListScalarFieldEnum.schema';

export const WordListGroupBySchema = z.object({
  where: WordListWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      WordListOrderByWithAggregationInputObjectSchema,
      WordListOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: WordListScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(WordListScalarFieldEnumSchema),
});
