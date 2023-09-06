import { z } from 'zod';
import { WordListOrderByWithRelationInputObjectSchema } from './objects/WordListOrderByWithRelationInput.schema';
import { WordListWhereInputObjectSchema } from './objects/WordListWhereInput.schema';
import { WordListWhereUniqueInputObjectSchema } from './objects/WordListWhereUniqueInput.schema';
import { WordListScalarFieldEnumSchema } from './enums/WordListScalarFieldEnum.schema';

export const WordListFindManySchema = z.object({
  orderBy: z
    .union([
      WordListOrderByWithRelationInputObjectSchema,
      WordListOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: WordListWhereInputObjectSchema.optional(),
  cursor: WordListWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(WordListScalarFieldEnumSchema).optional(),
});
