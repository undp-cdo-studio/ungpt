import * as dotenv from 'dotenv';
import { Client } from 'pg';

async function testConnection() {
  // Load environment variables
  dotenv.config({ path: '.env' });

  // Use local Supabase instance
  const connectionString = 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';

  const client = new Client({
    connectionString,
    ssl: false,  // No SSL needed for local connection
    connectionTimeoutMillis: 10000,
    application_name: 'ungpt-test'
  });

  try {
    console.log('Attempting to connect to local Supabase database...');
    console.log('Connection string:', connectionString);
    
    await client.connect();
    console.log('Successfully connected to Supabase database');
    
    const result = await client.query('SELECT version()');
    console.log('Database version:', result.rows[0].version);

    // Test organization table
    const orgResult = await client.query('SELECT COUNT(*) FROM organizations');
    console.log('Number of organizations:', orgResult.rows[0].count);
  } catch (error) {
    console.error('Error connecting to database:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
  } finally {
    await client.end();
  }
}

// Run the test
testConnection(); 