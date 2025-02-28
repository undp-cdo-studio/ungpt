import type { UseChatHelpers } from "ai/react";

import { ButtonScrollToBottom } from "@/components/chat/button-scroll-to-bottom";
import { FooterText } from "@/components/chat/footer";
import { PromptForm } from "@/components/chat/prompt-form";
import { buttonVariants } from "@/components/ui/button";
import { IconRefresh, IconStop } from "@/components/ui/icons";
import { cn } from "@/utils";

export interface ChatPanelProps
	extends Pick<
		UseChatHelpers,
		| "append"
		| "isLoading"
		| "reload"
		| "messages"
		| "stop"
		| "input"
		| "setInput"
	> {
	id?: string;
}

export function ChatPanel({
	id,
	isLoading,
	stop,
	append,
	reload,
	input,
	setInput,
	messages,
}: ChatPanelProps) {
	return (
		<div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
			<ButtonScrollToBottom />
			<div className="mx-auto sm:max-w-2xl sm:px-4">
				<div className="flex h-10 items-center justify-center">
					{isLoading ? (
						<button
							type="button"
							onClick={() => stop()}
							className={cn(
								buttonVariants({ variant: "outline" }),
								"bg-background",
							)}
						>
							<IconStop className="mr-2" />
							Stop generating
						</button>
					) : (
						messages?.length > 0 && (
							<button
								type="button"
								onClick={() => reload()}
								className={cn(
									buttonVariants({ variant: "outline" }),
									"bg-background",
								)}
							>
								<IconRefresh className="mr-2" />
								Regenerate response
							</button>
						)
					)}
				</div>
				<div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
					<PromptForm
						onSubmit={async (value) => {
							await append({
								id,
								content: value,
								role: "user",
							});
						}}
						input={input}
						setInput={setInput}
						isLoading={isLoading}
					/>
					<FooterText className="hidden sm:block" />
				</div>
			</div>
		</div>
	);
}
