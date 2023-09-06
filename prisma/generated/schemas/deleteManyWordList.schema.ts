import { z } from 'zod';
import { WordListWhereInputObjectSchema } from './objects/WordListWhereInput.schema';

export const WordListDeleteManySchema = z.object({
  where: WordListWhereInputObjectSchema.optional(),
});
