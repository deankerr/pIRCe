import { z } from 'zod';
import { TagOrderByWithRelationInputObjectSchema } from './objects/TagOrderByWithRelationInput.schema';
import { TagWhereInputObjectSchema } from './objects/TagWhereInput.schema';
import { TagWhereUniqueInputObjectSchema } from './objects/TagWhereUniqueInput.schema';
import { TagScalarFieldEnumSchema } from './enums/TagScalarFieldEnum.schema';

export const TagFindManySchema = z.object({
  orderBy: z
    .union([
      TagOrderByWithRelationInputObjectSchema,
      TagOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: TagWhereInputObjectSchema.optional(),
  cursor: TagWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(TagScalarFieldEnumSchema).optional(),
});
