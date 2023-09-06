import { z } from 'zod';
import { WordListCreateInputObjectSchema } from './objects/WordListCreateInput.schema';
import { WordListUncheckedCreateInputObjectSchema } from './objects/WordListUncheckedCreateInput.schema';

export const WordListCreateOneSchema = z.object({
  data: z.union([
    WordListCreateInputObjectSchema,
    WordListUncheckedCreateInputObjectSchema,
  ]),
});
