import { z } from 'zod';
import { OptionsWhereUniqueInputObjectSchema } from './objects/OptionsWhereUniqueInput.schema';

export const OptionsDeleteOneSchema = z.object({
  where: OptionsWhereUniqueInputObjectSchema,
});
