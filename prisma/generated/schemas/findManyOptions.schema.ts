import { z } from 'zod';
import { OptionsOrderByWithRelationInputObjectSchema } from './objects/OptionsOrderByWithRelationInput.schema';
import { OptionsWhereInputObjectSchema } from './objects/OptionsWhereInput.schema';
import { OptionsWhereUniqueInputObjectSchema } from './objects/OptionsWhereUniqueInput.schema';
import { OptionsScalarFieldEnumSchema } from './enums/OptionsScalarFieldEnum.schema';

export const OptionsFindManySchema = z.object({
  orderBy: z
    .union([
      OptionsOrderByWithRelationInputObjectSchema,
      OptionsOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: OptionsWhereInputObjectSchema.optional(),
  cursor: OptionsWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(OptionsScalarFieldEnumSchema).optional(),
});
