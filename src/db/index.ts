import logger from '@/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import pool from './db-pool-supabase';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (connectionString) {
  const maskedConnectionString = connectionString.replace(/:[^:@]+@/, ':****@');
  logger.debug('Using database connection:', maskedConnectionString);
}

const dbLogging = process.env.DB_LOGGING === 'true';

const db = drizzle(pool, { schema, logger: dbLogging });

export { db };
