import { z } from 'zod';
import { ConversationTagCreateManyInputObjectSchema } from './objects/ConversationTagCreateManyInput.schema';

export const ConversationTagCreateManySchema = z.object({
  data: z.union([
    ConversationTagCreateManyInputObjectSchema,
    z.array(ConversationTagCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
