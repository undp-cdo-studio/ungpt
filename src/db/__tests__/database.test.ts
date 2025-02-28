/**
 * @jest-environment node
 */


// Load test environment variables before importing database

import { beforeEach, describe, expect, it } from '@jest/globals';
import { db } from "../index";
import { chats, messages, organizations, users } from "../schema";
import { DatabaseService } from "../services";

console.lug('Test environment loaded:', {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV
});

describe("Database Operations", () => {
  let testOrganizationId: string;

  // Increase timeout for database operations
  jest.setTimeout(60000);

  // Clean up database before each test
  beforeEach(async () => {
    console.lug('Cleaning up database...');
    try {
      await db.delete(messages);
      await db.delete(chats);
      await db.delete(users);
      await db.delete(organizations);

      console.lug('Creating test organization...');
      // Create a test organization
      const org = await DatabaseService.createOrganization({
        name: "Test Organization",
        subdomain: "test",
        description: "Test Organization Description",
        systemPrompt: "Test System Prompt"
      });
      testOrganizationId = org.id;
      console.lug('Test organization created:', org);
    } catch (error) {
      console.error('Error in beforeEach:', error);
      throw error;
    }
  });

  describe("User Operations", () => {
    it("should create a new user", async () => {
      const email = "test@example.com";
      const name = "Test User";
      
      console.lug('Creating test user...');
      const user = await DatabaseService.createUser(email, name, testOrganizationId);
      console.lug('Test user created:', user);
      
      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      expect(user.name).toBe(name);
      expect(user.organizationId).toBe(testOrganizationId);
    });

    it("should get user by email", async () => {
      const email = "test@example.com";
      await DatabaseService.createUser(email, "Test User", testOrganizationId);
      
      const user = await DatabaseService.getUserByEmail(email);
      
      expect(user).toBeDefined();
      expect(user?.email).toBe(email);
    });
  });

  describe("Chat Operations", () => {
    it("should create a new chat", async () => {
      const user = await DatabaseService.createUser("test@example.com", "Test User", testOrganizationId);
      
      const chat = await DatabaseService.createChat(user.id, testOrganizationId);
      
      expect(chat).toBeDefined();
      expect(chat.userId).toBe(user.id);
      expect(chat.organizationId).toBe(testOrganizationId);
    });

    it("should get chats by user ID", async () => {
      const user = await DatabaseService.createUser("test@example.com", "Test User", testOrganizationId);
      await DatabaseService.createChat(user.id, testOrganizationId);
      await DatabaseService.createChat(user.id, testOrganizationId);
      
      const chats = await DatabaseService.getChatsByUserId(user.id);
      
      expect(chats).toHaveLength(2);
      expect(chats[0].userId).toBe(user.id);
      expect(chats[0].organizationId).toBe(testOrganizationId);
    });
  });

  describe("Message Operations", () => {
    it("should create a new message", async () => {
      const user = await DatabaseService.createUser("test@example.com", "Test User", testOrganizationId);
      const chat = await DatabaseService.createChat(user.id, testOrganizationId);
      
      const message = await DatabaseService.createMessage({
        chatId: chat.id,
        content: "Test message",
        role: "user",
        organizationId: testOrganizationId
      });
      
      expect(message).toBeDefined();
      expect(message.chatId).toBe(chat.id);
      expect(message.content).toBe("Test message");
      expect(message.role).toBe("user");
      expect(message.organizationId).toBe(testOrganizationId);
    });

    it("should get messages by chat ID", async () => {
      const user = await DatabaseService.createUser("test@example.com", "Test User", testOrganizationId);
      const chat = await DatabaseService.createChat(user.id, testOrganizationId);
      
      await DatabaseService.createMessage({
        chatId: chat.id,
        content: "Message 1",
        role: "user",
        organizationId: testOrganizationId
      });
      
      await DatabaseService.createMessage({
        chatId: chat.id,
        content: "Message 2",
        role: "assistant",
        organizationId: testOrganizationId
      });
      
      const messages = await DatabaseService.getMessagesByChatId(chat.id);
      
      expect(messages).toHaveLength(2);
      expect(messages[0].content).toBe("Message 1");
      expect(messages[1].content).toBe("Message 2");
    });
  });
}); 