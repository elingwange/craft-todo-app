import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from './schema';

export const db = drizzleNeon({
  client: neon(process.env.DATABASE_URL!),
  schema,
  casing: 'snake_case',
});
