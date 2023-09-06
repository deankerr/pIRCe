import { z } from 'zod';
import { OptionsCreateInputObjectSchema } from './objects/OptionsCreateInput.schema';
import { OptionsUncheckedCreateInputObjectSchema } from './objects/OptionsUncheckedCreateInput.schema';

export const OptionsCreateOneSchema = z.object({
  data: z.union([
    OptionsCreateInputObjectSchema,
    OptionsUncheckedCreateInputObjectSchema,
  ]),
});
