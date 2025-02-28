import { resolve } from 'node:path';

// We're now loading the environment variables from the shell script
// so we don't need to load them here
// config({ path: resolve(__dirname, '../.env') });

// Add debugging to check environment variables
console.log('Environment variables loaded:');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DATABASE_INITIALIZED:', process.env.DATABASE_INITIALIZED);
console.log('__dirname:', __dirname);
console.log('.env path:', resolve(__dirname, '../.env'));

// Set DATABASE_URL directly if not set by dotenv
if (!process.env.DATABASE_URL) {
  console.log('Setting DATABASE_URL manually');
  process.env.DATABASE_URL = process.env.DEFAULT_DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
  console.log('DATABASE_URL now:', process.env.DATABASE_URL);
}

import { UNDP_CLIENT_DATA } from '../src/data';
import { db } from '../src/db';
import type { NewOrganization } from '../src/db/schema';
import { chats, messages, organizations, users } from '../src/db/schema';

async function seed() {

  try {
    console.log('🌱 Starting database seed on remote database...');

    // Clean up existing data
    console.log('Cleaning up existing data...');
    await db.delete(messages);
    await db.delete(chats);
    await db.delete(users);
    await db.delete(organizations);

    // Create organizations from UNDP_CLIENT_DATA
    console.log('Creating organizations...');
    const organizationsData: NewOrganization[] = UNDP_CLIENT_DATA.map(client => ({
      name: client.name,
      subdomain: client.subdomain,
      homePage: client.homePage || null,
      assistantId: client.assistantId || null,
      description: client.description,
      systemPrompt: client.systemPrompt,
      disabled: client.disabled || false,
    }));

    await Promise.all(
      organizationsData.map(org =>
        db.insert(organizations).values(org).returning()
      )
    );

    // // Create test users for each organization
    // console.log('Creating test users...');
    // const testUsers: NewUser[] = [];
    // for (const org of createdOrgs) {
    //   const orgId = org[0].id;
    //   testUsers.push(
    //     { email: `test1@${org[0].subdomain}.undp.org`, name: `Test User 1 - ${org[0].name}`, organizationId: orgId },
    //     { email: `test2@${org[0].subdomain}.undp.org`, name: `Test User 2 - ${org[0].name}`, organizationId: orgId }
    //   );
    // }

    // const createdUsers = await Promise.all(
    //   testUsers.map(user =>
    //     db.insert(users).values(user).returning()
    //   )
    // );

    // // Create test chats
    // console.log('Creating test chats...');
    // const testChats = [];
    // for (const user of createdUsers) {
    //   if (user[0].organizationId) {
    //     const userChats: NewChat[] = [
    //       { 
    //         userId: user[0].id,
    //         organizationId: user[0].organizationId,
    //         title: 'General Discussion'
    //       },
    //       { 
    //         userId: user[0].id,
    //         organizationId: user[0].organizationId,
    //         title: 'Project Planning'
    //       },
    //     ];
    //     const createdChats = await Promise.all(
    //       userChats.map(chat =>
    //         db.insert(chats).values(chat).returning()
    //       )
    //     );
    //     testChats.push(...createdChats);
    //   }
    // }

    // // Create test messages
    // console.log('Creating test messages...');
    // for (const chat of testChats) {
    //   const chatMessages: NewMessage[] = [
    //     {
    //       chatId: chat[0].id,
    //       organizationId: chat[0].organizationId,
    //       content: 'Hello! How can I help you today?',
    //       role: 'assistant',
    //     },
    //     {
    //       chatId: chat[0].id,
    //       organizationId: chat[0].organizationId,
    //       content: 'I need help with UNDP project planning.',
    //       role: 'user',
    //     },
    //     {
    //       chatId: chat[0].id,
    //       organizationId: chat[0].organizationId,
    //       content: "I'll be happy to help you with project planning. What specific aspects would you like to discuss?",
    //       role: 'assistant',
    //     },
    //   ];

    //   await Promise.all(
    //     chatMessages.map(message =>
    //       db.insert(messages).values(message).returning()
    //     )
    //   );
    // }

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 