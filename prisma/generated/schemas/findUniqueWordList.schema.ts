import { z } from 'zod';
import { WordListWhereUniqueInputObjectSchema } from './objects/WordListWhereUniqueInput.schema';

export const WordListFindUniqueSchema = z.object({
  where: WordListWhereUniqueInputObjectSchema,
});
