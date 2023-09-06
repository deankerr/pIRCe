import { z } from 'zod';
import { WordListUpdateInputObjectSchema } from './objects/WordListUpdateInput.schema';
import { WordListUncheckedUpdateInputObjectSchema } from './objects/WordListUncheckedUpdateInput.schema';
import { WordListWhereUniqueInputObjectSchema } from './objects/WordListWhereUniqueInput.schema';

export const WordListUpdateOneSchema = z.object({
  data: z.union([
    WordListUpdateInputObjectSchema,
    WordListUncheckedUpdateInputObjectSchema,
  ]),
  where: WordListWhereUniqueInputObjectSchema,
});
