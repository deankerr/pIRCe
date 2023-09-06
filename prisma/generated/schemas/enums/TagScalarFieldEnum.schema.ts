import { z } from 'zod';

export const TagScalarFieldEnumSchema = z.enum([
  'id',
  'messageID',
  'key',
  'value',
]);
