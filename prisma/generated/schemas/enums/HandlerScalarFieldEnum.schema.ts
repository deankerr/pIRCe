import { z } from 'zod';

export const HandlerScalarFieldEnumSchema = z.enum([
  'id',
  'allowChannel',
  'allowQuery',
  'restrictServer',
  'restrictTarget',
  'restrictAdmin',
  'triggerWord',
  'triggerType',
  'feature',
  'profileID',
  'overrideOutputTarget',
]);
