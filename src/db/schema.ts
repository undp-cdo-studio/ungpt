import type { Action } from "@/types/types";
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const commonColumns = {
	id: uuid("id").primaryKey().defaultRandom(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

export const organizations = pgTable("organizations", {
	...commonColumns,
	name: text("name").notNull(),
	subdomain: text("subdomain").notNull().unique(),
	homePage: text("home_page"),
	description: text("description").notNull(),
	systemPrompt: text("system_prompt").notNull(),
	assistantId: text("assistant_id"),
	requireAuth: boolean("require_auth").default(false),
	disabled: boolean("disabled").default(false),
	actions: jsonb("actions").$type<Action[]>().default([]),
});

export const users = pgTable("users", {
	...commonColumns,
	email: text("email").notNull().unique(),
	name: text("name"),
	description: text("description"),
	systemPrompt: text("system_prompt"),
});

export const organisationMembers = pgTable("organisation_members", {
	...commonColumns,
	organizationId: uuid("organization_id").references(() => organizations.id),
	userId: uuid("user_id").references(() => users.id),
}); 


export const chats = pgTable("chats", {
  ...commonColumns,
  userId: uuid("user_id"),
  organizationId: uuid("organization_id").references(() => organizations.id),
  title: text("title"),
});

export const messages = pgTable("messages", {
	...commonColumns,
	chatId: uuid("chat_id")
		.references(() => chats.id)
		.notNull(),
	content: text("content").notNull(),
	role: text("role")
		.notNull()
		.$type<"data" | "system" | "user" | "assistant">(),
});

// type with commmoncolumns removed
type CommonColumns = Omit<
	typeof commonColumns,
	"id" | "createdAt" | "updatedAt"
>;

export type Organization = CommonColumns & typeof organizations.$inferSelect;
export type NewOrganization = CommonColumns & typeof organizations.$inferInsert;
export type User = CommonColumns & typeof users.$inferSelect;
export type NewUser = CommonColumns & typeof users.$inferInsert;
export type Chat = CommonColumns & typeof chats.$inferSelect;
export type NewChat = CommonColumns & typeof chats.$inferInsert;
export type Message = CommonColumns & typeof messages.$inferSelect;
export type NewMessage = CommonColumns & typeof messages.$inferInsert;
