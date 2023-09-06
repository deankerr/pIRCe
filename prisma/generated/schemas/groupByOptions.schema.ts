import { z } from 'zod';
import { OptionsWhereInputObjectSchema } from './objects/OptionsWhereInput.schema';
import { OptionsOrderByWithAggregationInputObjectSchema } from './objects/OptionsOrderByWithAggregationInput.schema';
import { OptionsScalarWhereWithAggregatesInputObjectSchema } from './objects/OptionsScalarWhereWithAggregatesInput.schema';
import { OptionsScalarFieldEnumSchema } from './enums/OptionsScalarFieldEnum.schema';

export const OptionsGroupBySchema = z.object({
  where: OptionsWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      OptionsOrderByWithAggregationInputObjectSchema,
      OptionsOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: OptionsScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(OptionsScalarFieldEnumSchema),
});
