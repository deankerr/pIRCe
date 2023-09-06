import { z } from 'zod';

export const OptionsScalarFieldEnumSchema = z.enum([
  'options',
  'moderationProfile',
  'outputFileURLTemplate',
  'outputFileDir',
  'outputFilenameIDLength',
  'outputIRCMaxNewlines',
  'outputIRCMaxChars',
  'apiTimeoutMs',
  'appName',
  'appURL',
]);
