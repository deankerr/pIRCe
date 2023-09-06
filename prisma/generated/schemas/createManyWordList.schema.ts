import { z } from 'zod';
import { WordListCreateManyInputObjectSchema } from './objects/WordListCreateManyInput.schema';

export const WordListCreateManySchema = z.object({
  data: z.union([
    WordListCreateManyInputObjectSchema,
    z.array(WordListCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
