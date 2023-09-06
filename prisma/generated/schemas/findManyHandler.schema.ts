import { z } from 'zod';
import { HandlerOrderByWithRelationInputObjectSchema } from './objects/HandlerOrderByWithRelationInput.schema';
import { HandlerWhereInputObjectSchema } from './objects/HandlerWhereInput.schema';
import { HandlerWhereUniqueInputObjectSchema } from './objects/HandlerWhereUniqueInput.schema';
import { HandlerScalarFieldEnumSchema } from './enums/HandlerScalarFieldEnum.schema';

export const HandlerFindManySchema = z.object({
  orderBy: z
    .union([
      HandlerOrderByWithRelationInputObjectSchema,
      HandlerOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: HandlerWhereInputObjectSchema.optional(),
  cursor: HandlerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(HandlerScalarFieldEnumSchema).optional(),
});
