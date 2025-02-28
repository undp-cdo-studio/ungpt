"use client";

// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from "ai";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import CopyPaste from "@/components/ui/copy-paste";
import { truncateString } from "@/helpers";
import { cn } from "@/utils";

export interface ChatMessageProps {
	message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
	return (
		<article
			className={cn(
				"whitespace-pre-wrap mb-6",
				message.role === "user"
					? "flex flex-col items-end"
					: "flex flex-col items-start"
			)}
			{...props}
		>
			<div
				className={cn(
					"rounded-2xl px-4 py-3 max-w-[85%]",
					message.role === "user"
						? "bg-gray-100"
						: message.role === "assistant"
							? "bg-white border border-gray-200"
							: "bg-gray-50 w-full"
				)}
			>
				<ReactMarkdown
					className={cn(
						"prose break-words",
						"prose-p:leading-6 prose-li:leading-6",
						"prose-pre:p-0",
						"prose-hr:my-2",
						"prose-p:my-0",
						"prose-headings:mb-3 prose-headings:mt-6",
						"prose-footnote-ref:text-blue-600 prose-footnote-ref:no-underline",
						"prose-footnote-def:text-sm prose-footnote-def:text-gray-600 prose-footnote-def:mt-2",
						message.role === "user"
							? "text-right"
							: "text-left"
					)}
					remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
					components={{
						p({ children }) {
							return <p className="mb-2 last:mb-0">{children}</p>;
						},
						// Add custom styling for footnotes
						a({ node, className, children, ...props }) {
							if (className === 'footnote-ref') {
								return (
									<sup>
										<a {...props} className="text-blue-600 no-underline">
											{children}
										</a>
									</sup>
								);
							}
							if (className === 'footnote-backref') {
								return (
									<a {...props} className="text-blue-600 no-underline ml-1">
										↩
									</a>
								);
							}
							return <a {...props}>{children}</a>;
						},
					}}
				>
					{message.role === "system"
						? truncateString(message.content, 100)
						: message.content}
				</ReactMarkdown>
			</div>
			{message.role === "assistant" && (
				<div className="flex items-center gap-2 mt-2 ml-4">
					<CopyPaste textToCopy={message.content} />
					<button
						type="button"
						aria-label="Text to speech"
						className="p-1 hover:bg-gray-100 rounded-full"
					>
						<svg
							className="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</button>
					<button
						type="button"
						aria-label="Rate response"
						className="p-1 hover:bg-gray-100 rounded-full"
					>
						<svg
							className="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
							/>
						</svg>
					</button>
				</div>
			)}
		</article>
	);
}


export function ChatMessageList({ messages }: { messages: Message[] }) {
	return (
		<div>
			{messages.map((message) => (
				<ChatMessage key={message.id} message={message} />
			))}
		</div>
	);
}
