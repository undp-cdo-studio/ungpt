const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema');

// Create a connection pool with explicit configuration
const pool = new Pool({
	host: '127.0.0.1',
	port: 54322,
	user: 'postgres',
	password: 'postgres',
	database: 'postgres',
	ssl: false,  // No SSL needed for local connection
	max: 20,  // Maximum number of clients in the pool
	idleTimeoutMillis: 30000,  // How long a client is allowed to remain idle before being closed
	connectionTimeoutMillis: 10000,
	application_name: 'ungpt'
});

// Create drizzle database instance
export const db = drizzle(pool, { schema });

// Export the pool for direct usage if needed
export const pgClient = pool;
