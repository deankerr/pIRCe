import { z } from 'zod';
import { ConversationTagUpdateInputObjectSchema } from './objects/ConversationTagUpdateInput.schema';
import { ConversationTagUncheckedUpdateInputObjectSchema } from './objects/ConversationTagUncheckedUpdateInput.schema';
import { ConversationTagWhereUniqueInputObjectSchema } from './objects/ConversationTagWhereUniqueInput.schema';

export const ConversationTagUpdateOneSchema = z.object({
  data: z.union([
    ConversationTagUpdateInputObjectSchema,
    ConversationTagUncheckedUpdateInputObjectSchema,
  ]),
  where: ConversationTagWhereUniqueInputObjectSchema,
});
