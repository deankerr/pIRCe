import { z } from 'zod';
import { HandlerWhereInputObjectSchema } from './objects/HandlerWhereInput.schema';
import { HandlerOrderByWithAggregationInputObjectSchema } from './objects/HandlerOrderByWithAggregationInput.schema';
import { HandlerScalarWhereWithAggregatesInputObjectSchema } from './objects/HandlerScalarWhereWithAggregatesInput.schema';
import { HandlerScalarFieldEnumSchema } from './enums/HandlerScalarFieldEnum.schema';

export const HandlerGroupBySchema = z.object({
  where: HandlerWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      HandlerOrderByWithAggregationInputObjectSchema,
      HandlerOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: HandlerScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(HandlerScalarFieldEnumSchema),
});
