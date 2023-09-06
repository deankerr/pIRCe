import { z } from 'zod';
import { OptionsUpdateInputObjectSchema } from './objects/OptionsUpdateInput.schema';
import { OptionsUncheckedUpdateInputObjectSchema } from './objects/OptionsUncheckedUpdateInput.schema';
import { OptionsWhereUniqueInputObjectSchema } from './objects/OptionsWhereUniqueInput.schema';

export const OptionsUpdateOneSchema = z.object({
  data: z.union([
    OptionsUpdateInputObjectSchema,
    OptionsUncheckedUpdateInputObjectSchema,
  ]),
  where: OptionsWhereUniqueInputObjectSchema,
});
