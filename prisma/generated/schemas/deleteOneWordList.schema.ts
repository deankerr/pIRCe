import { z } from 'zod';
import { WordListWhereUniqueInputObjectSchema } from './objects/WordListWhereUniqueInput.schema';

export const WordListDeleteOneSchema = z.object({
  where: WordListWhereUniqueInputObjectSchema,
});
