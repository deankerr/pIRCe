import { z } from 'zod';
import { OptionsWhereUniqueInputObjectSchema } from './objects/OptionsWhereUniqueInput.schema';

export const OptionsFindUniqueSchema = z.object({
  where: OptionsWhereUniqueInputObjectSchema,
});
