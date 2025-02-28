import logger from "@/logger";
import { eq } from "drizzle-orm";
import { db } from ".";
import {
	type Chat,
	type Message,
	type NewMessage,
	type NewOrganization,
	type Organization,
	type User,
	chats,
	messages,
	organizations,
	users
} from "./schema";

type CreateChatProps = {
	organizationId?: string;
	subdomain?: string;
	userId?: string;
	title?: string;
}

export const DatabaseService = {
	// Organization operations
	async createOrganization(org: NewOrganization): Promise<Organization> {
		const [organization] = await db.insert(organizations).values(org).returning();
		if (!organization) {
			throw new Error('Failed to create organization');
		}
		return organization;
	},

	async getOrganizationById(id: string): Promise<Organization | undefined> {
		const [organization] = await db.select().from(organizations).where(eq(organizations.id, id));
		return organization;
	},

	// User operations
	async createUser(email: string, name?: string): Promise<User> {
		const [user] = await db.insert(users).values({ email, name }).returning();
		if (!user) {
			throw new Error('Failed to create user');
		}
		return user;
	},

	async getUserByEmail(email: string): Promise<User | undefined> {
		const [user] = await db.select().from(users).where(eq(users.email, email));
		return user;
	},
	

	// Chat operations
	async createChat({
		userId,
		subdomain,
		organizationId,
		title,
	}: CreateChatProps): Promise<Chat> {

		if (subdomain) {
			const org = await this.getOrganizationBySubdomain(subdomain);
			if (org) {
				organizationId = org.id;
			}
		}

		const [chat] = await db.insert(chats).values({ 
			userId, 
			organizationId,
			title 
		}).returning();
		
		if (!chat) {
			throw new Error('Failed to create chat');
		}
		return chat;
	},

	async getChatsByUserId(userId: string): Promise<Chat[]> {
		return db.select().from(chats).where(eq(chats.userId, userId));
	},

	async getChatById(chatId: string): Promise<Chat | undefined> {
		const [chat] = await db.select().from(chats).where(eq(chats.id, chatId));
		return chat;
	},

	// Message operations
	async createMessage(message: NewMessage): Promise<Message> {
		logger.api("Creating message", { message });
		const [newMessage] = await db.insert(messages).values(message).returning();
		if (!newMessage) {
			throw new Error('Failed to create message');
		}
		return newMessage;
	},

	async getMessagesByChatId(chatId: string): Promise<Message[]> {
		return db
			.select()
			.from(messages)
			.where(eq(messages.chatId, chatId))
			.orderBy(messages.createdAt);
	},

	async getChatsByOrganizationId(organizationId: string): Promise<Chat[]> {
		return db.select().from(chats).where(eq(chats.organizationId, organizationId));
	},

	async getOrganizationBySubdomain(subdomain: string): Promise<Organization | undefined> {
		const [org] = await db.select().from(organizations).where(eq(organizations.subdomain, subdomain));
		return org;
	}		
};
