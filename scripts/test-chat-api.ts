const { config } = require('dotenv');
const { resolve } = require('path');
const { db, users, organizations } = require('../src/db');
const { eq } = require('drizzle-orm');
import { Message } from 'ai';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env') });

async function testChatAPI() {
  try {
    console.log('Testing Chat API with remote database...');
    console.log('Using DATABASE_URL:', process.env.DATABASE_URL);

    // Get the first organization and user from our seeded data
    const org = await db.select().from(organizations).limit(1);
    if (!org.length) {
      throw new Error('No organization found in database');
    }

    const user = await db.select().from(users).where(eq(users.organizationId, org[0].id)).limit(1);
    if (!user.length) {
      throw new Error('No user found for organization');
    }

    console.log('Using organization:', org[0].name);
    console.log('Using user:', user[0].email);

    const testMessage: Message = {
      id: 'test-1',
      content: 'Hello, this is a test message',
      role: 'user',
    };

    const payload = {
      messages: [testMessage],
      systemPrompt: 'You are a helpful assistant.',
      userId: user[0].id,
      organizationId: org[0].id,
      chatId: '', // Let the system create a new chat
    };

    console.log('Sending test request to chat API...');
    const response = await fetch('http://localhost:4208/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    // Handle streaming response
    console.log('Reading stream response...');
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body available');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Convert the Uint8Array to a string
      const text = new TextDecoder().decode(value);
      console.log('Received chunk:', text);
    }

    console.log('✅ Chat API test completed successfully!');
  } catch (error) {
    console.error('❌ Error testing chat API:', error);
    process.exit(1);
  }
}

// Run the test
testChatAPI(); 