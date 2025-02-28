import logger from '@/logger';
import { config } from 'dotenv';
import { db } from './index';
import { organizations } from './schema';

// Load environment variables
config();

async function testSupabaseConnection() {
  try {
    logger.info('Testing Supabase database connection...');
    
    // Try to query the organizations table
    const result = await db.select().from(organizations).limit(5);
    
    logger.info('Successfully connected to Supabase database!');
    logger.info(`Found ${result.length} organizations in the database.`);
    
    // Log the organization names if any exist
    if (result.length > 0) {
      logger.info('Organizations:');
      result.forEach((org, index) => {
        logger.info(`${index + 1}. ${org.name} (${org.subdomain})`);
      });
    } else {
      logger.info('No organizations found in the database.');
    }
    
    return true;
  } catch (error) {
    logger.error('Failed to connect to Supabase database:', error);
    return false;
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testSupabaseConnection()
    .then((success) => {
      if (success) {
        logger.info('Supabase connection test completed successfully.');
      } else {
        logger.error('Supabase connection test failed.');
        process.exit(1);
      }
    })
    .catch((error) => {
      logger.error('Unexpected error during Supabase connection test:', error);
      process.exit(1);
    });
}

export default testSupabaseConnection; 