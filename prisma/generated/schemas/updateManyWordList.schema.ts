import { z } from 'zod';
import { WordListUpdateManyMutationInputObjectSchema } from './objects/WordListUpdateManyMutationInput.schema';
import { WordListWhereInputObjectSchema } from './objects/WordListWhereInput.schema';

export const WordListUpdateManySchema = z.object({
  data: WordListUpdateManyMutationInputObjectSchema,
  where: WordListWhereInputObjectSchema.optional(),
});
