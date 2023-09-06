import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './objects/ConversationTagWhereUniqueInput.schema';

export const ConversationTagFindUniqueSchema = z.object({
  where: ConversationTagWhereUniqueInputObjectSchema,
});
