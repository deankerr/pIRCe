import { z } from 'zod';

export const ConversationTagScalarFieldEnumSchema = z.enum([
  'id',
  'profileID',
  'profileVersion',
  'messageID',
  'metadata',
]);
