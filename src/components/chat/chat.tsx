"use client";

import { ChatMessage } from "@/components/chat/chat-message";
import logger from "@/logger";
import type { TranslationProps } from "@/types/types";
import { cn } from "@/utils";
import { type Message, useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { HandleSubmitProps } from "./chat-input";
import { ChatInput } from "./chat-input";

export type ChatClientProps = TranslationProps & {
	messages?: Message[];
	threadId?: string;
	enableAuth?: boolean;
	name?: string;
	subdomain?: string;
	description?: string;
	welcomeMessage?: string;
	systemPrompt?: string;
};

export function ChatClient(props: ChatClientProps) {
	logger.lug("ChatClient props", props);

	const {
		threadId: initialThreadId,
		subdomain,
		messages: initialMessages,
		systemPrompt,
		welcomeMessage,
		locale,
	} = props;

	let chatId = initialThreadId;
	const [threadId, setThreadId] = useState(initialThreadId);
	const [started, setStarted] = useState(false);
	const router = useRouter();

	const {
		messages: apiMessages,
		input,
		handleInputChange,
		handleSubmit: handleChatSubmit,
		append,
		setInput,
		isLoading,
		stop,
	} = useChat({
		body: {
			subdomain,
			threadId,
			systemPrompt,
		},
		initialMessages,
		onFinish: () => {
			setStarted(true);
		},
	});
	const hasMessages = apiMessages.length > 0;
	const showWelcome = !started && !hasMessages;
	const messages = apiMessages;
	logger.lug("Messages", messages);

	async function handleSubmit(args: HandleSubmitProps) {
		logger.log("handleSubmit", args);
		const { message } = args;

		if (!chatId) {
			const chat = await fetch("/api/chat/create", {
				method: "POST",
				body: JSON.stringify({
					subdomain,
					title: message,
				}),
			});
			const data = await chat.json();
			logger.log("Chat created", data);
			setThreadId(data.id);
			if (!data.id) {
				throw new Error("No chat ID found");
			}

			chatId = data.id;

			// router.push(`/${locale || 'en'}/chat/${data.id}`);
			window.history.pushState(null, "", `chat/${data.id}`);
		}

		if (!started) {
			setStarted(true);
		}
		logger.log("Appending message", { message, chatId });
		append({
			role: "user",
			content: message,
			data: chatId,
		});
	}

	useEffect(() => {
		messages?.length > 0 && window.scrollTo(0, document.body.scrollHeight);
	}, [messages]);

	return (
		<div className="py-[4%] px-[2%] md:px-[10%] mb-[10%]">
			<div className={cn("flex flex-col w-full max-w-2xl mx-auto")}>
				{showWelcome && (
					<div
						className="text-center border rounded-lg m-12 
					p-4 border-gray-200 mb-4"
					>
						{welcomeMessage}
					</div>
				)}
				{messages &&
					messages.length > 0 &&
					messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
				{isLoading && (
					<div className="flex items-center justify-center gap-2 py-4 text-gray-500">
						<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
						<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
						<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
					</div>
				)}
			</div>
			<div className="w-[80%] mb-3">
				<ChatInput
					onSubmit={handleSubmit}
					input={input}
					handleInputChange={handleInputChange}
					isLoading={isLoading}
					stop={stop}
					append={append}
					setInput={setInput}
					onFileSelect={(files) => {
						// Handle file selection
						logger.lug("Files selected:", files);
					}}
				/>
			</div>
		</div>
	);
}
