import { z } from 'zod';
import { OptionsOrderByWithRelationInputObjectSchema } from './objects/OptionsOrderByWithRelationInput.schema';
import { OptionsWhereInputObjectSchema } from './objects/OptionsWhereInput.schema';
import { OptionsWhereUniqueInputObjectSchema } from './objects/OptionsWhereUniqueInput.schema';
import { OptionsCountAggregateInputObjectSchema } from './objects/OptionsCountAggregateInput.schema';
import { OptionsMinAggregateInputObjectSchema } from './objects/OptionsMinAggregateInput.schema';
import { OptionsMaxAggregateInputObjectSchema } from './objects/OptionsMaxAggregateInput.schema';
import { OptionsAvgAggregateInputObjectSchema } from './objects/OptionsAvgAggregateInput.schema';
import { OptionsSumAggregateInputObjectSchema } from './objects/OptionsSumAggregateInput.schema';

export const OptionsAggregateSchema = z.object({
  orderBy: z
    .union([
      OptionsOrderByWithRelationInputObjectSchema,
      OptionsOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: OptionsWhereInputObjectSchema.optional(),
  cursor: OptionsWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), OptionsCountAggregateInputObjectSchema])
    .optional(),
  _min: OptionsMinAggregateInputObjectSchema.optional(),
  _max: OptionsMaxAggregateInputObjectSchema.optional(),
  _avg: OptionsAvgAggregateInputObjectSchema.optional(),
  _sum: OptionsSumAggregateInputObjectSchema.optional(),
});
