import { z } from 'zod';
import { ConversationTagUpdateManyMutationInputObjectSchema } from './objects/ConversationTagUpdateManyMutationInput.schema';
import { ConversationTagWhereInputObjectSchema } from './objects/ConversationTagWhereInput.schema';

export const ConversationTagUpdateManySchema = z.object({
  data: ConversationTagUpdateManyMutationInputObjectSchema,
  where: ConversationTagWhereInputObjectSchema.optional(),
});
