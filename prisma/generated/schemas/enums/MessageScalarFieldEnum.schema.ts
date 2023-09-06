import { z } from 'zod';

export const MessageScalarFieldEnumSchema = z.enum([
  'id',
  'target',
  'nick',
  'type',
  'content',
  'self',
  'time',
  'mask',
  'server',
]);
