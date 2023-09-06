import { z } from 'zod';

export const ModelScalarFieldEnumSchema = z.enum([
  'id',
  'label',
  'description',
  'platformID',
  'feature',
  'promptFormat',
]);
