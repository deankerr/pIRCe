import { z } from 'zod';

export const PlatformScalarFieldEnumSchema = z.enum(['id', 'label', 'apiKey']);
