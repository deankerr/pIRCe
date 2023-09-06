import { z } from 'zod';

export const ProfileScalarFieldEnumSchema = z.enum([
  'id',
  'version',
  'label',
  'description',
  'parameters',
  'modelID',
  'platformID',
  'mainPrompt',
  'examplePrompt',
  'postPrompt',
  'postPromptOffset',
  'maxHistoryLength',
  'maxLocalIRCLength',
]);
