import { z } from 'zod';
import { ConversationTagWhereUniqueInputObjectSchema } from './objects/ConversationTagWhereUniqueInput.schema';
import { ConversationTagCreateInputObjectSchema } from './objects/ConversationTagCreateInput.schema';
import { ConversationTagUncheckedCreateInputObjectSchema } from './objects/ConversationTagUncheckedCreateInput.schema';
import { ConversationTagUpdateInputObjectSchema } from './objects/ConversationTagUpdateInput.schema';
import { ConversationTagUncheckedUpdateInputObjectSchema } from './objects/ConversationTagUncheckedUpdateInput.schema';

export const ConversationTagUpsertSchema = z.object({
  where: ConversationTagWhereUniqueInputObjectSchema,
  create: z.union([
    ConversationTagCreateInputObjectSchema,
    ConversationTagUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ConversationTagUpdateInputObjectSchema,
    ConversationTagUncheckedUpdateInputObjectSchema,
  ]),
});
