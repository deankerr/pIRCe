import { z } from 'zod';
import { ConversationTagWhereInputObjectSchema } from './objects/ConversationTagWhereInput.schema';

export const ConversationTagDeleteManySchema = z.object({
  where: ConversationTagWhereInputObjectSchema.optional(),
});
