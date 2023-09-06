import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './objects/ConversationTagWhereUniqueInput.schema';

export const ConversationTagDeleteOneSchema = z.object({
  where: ConversationTagWhereUniqueInputObjectSchema,
});
