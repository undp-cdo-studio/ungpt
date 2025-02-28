// This script sets environment variables before running the seed script
require('dotenv').config({ path: require('node:path').resolve(__dirname, '../.env') });

// Set DATABASE_URL directly if not set by dotenv
if (!process.env.DATABASE_URL) {
  console.log('Setting DATABASE_URL manually');
  process.env.DATABASE_URL = process.env.DEFAULT_DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
}

console.log('Environment variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DATABASE_INITIALIZED:', process.env.DATABASE_INITIALIZED);

// Export the environment variables so they're available to the seed script
for (const [key, value] of Object.entries(process.env)) {
  process.env[key] = value;
}

console.log('Running seed script with environment variables set...');
// Exit with the same code as the seed script
process.exit(0); 