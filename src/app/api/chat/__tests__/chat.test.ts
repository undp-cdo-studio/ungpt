import { db } from "@/db";
import {
	type Chat,
	type Organization,
	type User,
	chats,
	messages,
	organizations,
	users,
} from "@/db/schema";
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "@jest/globals";
import { NextRequest } from "next/server";
import { POST } from "../route";

describe("Chat API", () => {
	let testUser: User;
	let testOrg: Organization;
	let testChat: Chat;

	beforeAll(async () => {
		// Clean up any existing data
		await db.delete(messages);
		await db.delete(chats);
		await db.delete(users);
		await db.delete(organizations);

		// Create test organization
		const [org] = await db
			.insert(organizations)
			.values({
				name: "Test Organization",
				subdomain: "test-org",
				description: "Test organization description",
				systemPrompt: "You are a test assistant",
				assistantId: process.env.ASSISTANT_ID,
			})
			.returning();
		testOrg = org;

		// Create test user
		const [user] = await db
			.insert(users)
			.values({
				email: "test@example.com",
				name: "Test User",
				organizationId: testOrg.id,
			})
			.returning();
		testUser = user;

		// Create test chat
		const [chat] = await db
			.insert(chats)
			.values({
				userId: testUser.id,
				organizationId: testOrg.id,
				title: "Test Chat",
			})
			.returning();
		testChat = chat;
	}, 30000);

	afterAll(async () => {
		// Clean up test data
		await db.delete(messages);
		await db.delete(chats);
		await db.delete(users);
		await db.delete(organizations);
	}, 30000);

	beforeEach(async () => {
		// Clean up messages before each test
		await db.delete(messages);
	}, 30000);

	it("should return a valid stream response", async () => {
		const req = new NextRequest("http://localhost:3000/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: [{ role: "user", content: "Hello, test message" }],
				systemPrompt: testOrg.systemPrompt,
			}),
		});

		const response = await POST(req);
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("text/event-stream");
		
		// Read and verify the stream
		const reader = response.body?.getReader();
		if (!reader) {
			throw new Error("No reader available");
		}

		let receivedData = false;
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			
			// Convert the Uint8Array to string
			const chunk = new TextDecoder().decode(value);
			expect(chunk).toContain("data: "); // Verify SSE format
			receivedData = true;
		}

		expect(receivedData).toBe(true);
	}, 30000);

	it("should handle errors gracefully", async () => {
		const req = new NextRequest("http://localhost:3000/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: [], // Invalid empty messages
				systemPrompt: testOrg.systemPrompt,
			}),
		});

		const response = await POST(req);
		expect(response.status).toBe(500);
		const data = await response.json();
		expect(data).toHaveProperty("error");
	}, 30000);
});
