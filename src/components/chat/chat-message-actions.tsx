"use client";

import type { Message } from "ai";
import type * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/utils";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
	message: Message;
}

export function ChatMessageActions({
	message,
	className,
	...props
}: ChatMessageActionsProps) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

	const onCopy = () => {
		if (isCopied) return;
		copyToClipboard(message.content);
	};

	return (
		<div
			className={cn(
				"flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0",
				className,
			)}
			{...props}
		>
			<button
				type="button"
				onClick={onCopy}
				className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
				aria-label="Copy message"
			>
				{isCopied ? <IconCheck /> : <IconCopy />}
				<span className="sr-only">Copy message</span>
			</button>
		</div>
	);
}
