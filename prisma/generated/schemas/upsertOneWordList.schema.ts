import { z } from 'zod';
import { WordListWhereUniqueInputObjectSchema } from './objects/WordListWhereUniqueInput.schema';
import { WordListCreateInputObjectSchema } from './objects/WordListCreateInput.schema';
import { WordListUncheckedCreateInputObjectSchema } from './objects/WordListUncheckedCreateInput.schema';
import { WordListUpdateInputObjectSchema } from './objects/WordListUpdateInput.schema';
import { WordListUncheckedUpdateInputObjectSchema } from './objects/WordListUncheckedUpdateInput.schema';

export const WordListUpsertSchema = z.object({
  where: WordListWhereUniqueInputObjectSchema,
  create: z.union([
    WordListCreateInputObjectSchema,
    WordListUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    WordListUpdateInputObjectSchema,
    WordListUncheckedUpdateInputObjectSchema,
  ]),
});
