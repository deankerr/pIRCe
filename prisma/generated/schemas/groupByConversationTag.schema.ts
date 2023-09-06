import { z } from 'zod';
import { ConversationTagWhereInputObjectSchema } from './objects/ConversationTagWhereInput.schema';
import { ConversationTagOrderByWithAggregationInputObjectSchema } from './objects/ConversationTagOrderByWithAggregationInput.schema';
import { ConversationTagScalarWhereWithAggregatesInputObjectSchema } from './objects/ConversationTagScalarWhereWithAggregatesInput.schema';
import { ConversationTagScalarFieldEnumSchema } from './enums/ConversationTagScalarFieldEnum.schema';

export const ConversationTagGroupBySchema = z.object({
  where: ConversationTagWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ConversationTagOrderByWithAggregationInputObjectSchema,
      ConversationTagOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ConversationTagScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ConversationTagScalarFieldEnumSchema),
});
