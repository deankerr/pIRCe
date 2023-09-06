import { z } from 'zod';
import { ConversationTagCreateInputObjectSchema } from './objects/ConversationTagCreateInput.schema';
import { ConversationTagUncheckedCreateInputObjectSchema } from './objects/ConversationTagUncheckedCreateInput.schema';

export const ConversationTagCreateOneSchema = z.object({
  data: z.union([
    ConversationTagCreateInputObjectSchema,
    ConversationTagUncheckedCreateInputObjectSchema,
  ]),
});
