import { getModel } from "@/ai/ai";
import type { NewMessage } from "@/db/schema";
import { DatabaseService } from "@/db/services";
import logger from "@/logger";
import { type Message, generateText, streamText } from "ai";

type ChatProps = {
	stream?: boolean;
	messages: Message[];
	systemPrompt: string;
	chatId: string;
	subdomain: string;
	userId?: string;
	model?: string;
};

export async function getChat(props: ChatProps): Promise<any> {
	logger.api("getChat", props);

	const {
		messages,
		systemPrompt,
		userId,
		subdomain,
		model: userRequestedModel,
		stream: userRequestedStream,
	} = props;

	// Store user message
	const lastUserMessage = messages[messages.length - 1];
	if (!lastUserMessage) {
		throw new Error("No user message found");
	}

	const chatId = String(lastUserMessage.data);

	logger.api("Chat ID", { chatId });

	if (!chatId) {
		throw new Error("No chat ID found");
	}
  
	const DATABASE_INITIALIZED = Boolean(
		process.env.DATABASE_INITIALIZED === "true",
	);
	const model = await getModel({ model: userRequestedModel });

	logger.api("Chat API Request", {
		...props,
		DATABASE_INITIALIZED,
		model,
	});

	if (!model) {
		logger.error("No model found");
		throw new Error("No model found");
	}

	if (DATABASE_INITIALIZED) {
		const content = lastUserMessage.content;
		if (typeof content !== "string") {
			throw new Error("Message content must be a string");
		}

		const messageData: NewMessage = {
			chatId,
			content,
			role: "user" as const,
		};

		try {
			await DatabaseService.createMessage(messageData);
		} catch (error) {
			logger.error("Error creating message", { error });
			throw error;
		}
	}

	if (userRequestedStream) {
		// Handle both real and mocked responses
		try {
			const result = await streamText({
				model,
				system: systemPrompt,
				messages,
				onFinish,
			});

			logger.api("Stream Result", { result });
			return result;
		} catch (error) {
			logger.error("Error streaming text", { error });
			throw error;
		}
	}

	try {
		const result = await generateText({
			model,
			system: systemPrompt,
			messages,
		});

		// Property 'toDataStreamResponse' does not exist on type 'StreamTextResult<ToolSet, never> | GenerateTextResult<ToolSet, never>'.
		// Property 'toDataStreamResponse' does not exist on type 'GenerateTextResult<ToolSet, never>'.

		logger.api("Generate Result", { result });
		return result;
	} catch (error) {
		logger.error("Error generating text", { error });
		throw error;
	}

	async function onFinish(response: any) {
		const { text } = response;
		logger.api("onFinish", {
			text,
			DATABASE_INITIALIZED,
			chatId,
		});
		if (DATABASE_INITIALIZED) {
			if (typeof text !== "string") {
				throw new Error("Response text must be a string");
			}

			const messageData = {
				chatId,
				content: text,
				role: "assistant" as const,
			};

			await DatabaseService.createMessage(messageData);
		}
	}
}
