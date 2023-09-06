import { z } from 'zod';
import { OptionsWhereUniqueInputObjectSchema } from './objects/OptionsWhereUniqueInput.schema';
import { OptionsCreateInputObjectSchema } from './objects/OptionsCreateInput.schema';
import { OptionsUncheckedCreateInputObjectSchema } from './objects/OptionsUncheckedCreateInput.schema';
import { OptionsUpdateInputObjectSchema } from './objects/OptionsUpdateInput.schema';
import { OptionsUncheckedUpdateInputObjectSchema } from './objects/OptionsUncheckedUpdateInput.schema';

export const OptionsUpsertSchema = z.object({
  where: OptionsWhereUniqueInputObjectSchema,
  create: z.union([
    OptionsCreateInputObjectSchema,
    OptionsUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    OptionsUpdateInputObjectSchema,
    OptionsUncheckedUpdateInputObjectSchema,
  ]),
});
