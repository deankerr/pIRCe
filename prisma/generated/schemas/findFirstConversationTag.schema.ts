import { z } from 'zod';
import { ConversationTagOrderByWithRelationInputObjectSchema } from './objects/ConversationTagOrderByWithRelationInput.schema';
import { ConversationTagWhereInputObjectSchema } from './objects/ConversationTagWhereInput.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './objects/ConversationTagWhereUniqueInput.schema';
import { ConversationTagScalarFieldEnumSchema } from './enums/ConversationTagScalarFieldEnum.schema';

export const ConversationTagFindFirstSchema = z.object({
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
  distinct: z.array(ConversationTagScalarFieldEnumSchema).optional(),
});
