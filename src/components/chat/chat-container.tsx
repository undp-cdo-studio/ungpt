import type { Locale } from "@/i18n";
import type { TranslationObject } from "@/i18n/loadTranslation";
import type { Message } from "ai";
import { ChatClient } from "./chat";

interface ChatContainerProps {
	locale: Locale;
	translation: TranslationObject;
	threadId: string;
	messages: Message[];
	name?: string;
	subdomain?: string;
	description?: string;
	welcomeMessage?: string;
	systemPrompt?: string;
}

export default function ChatContainer({
	locale,
	translation,
	threadId,
	messages,
	name,
	subdomain,
	description,
	welcomeMessage,
	systemPrompt,
}: ChatContainerProps) {
	return (
		<ChatClient
			locale={locale}
			translation={translation}
			threadId={threadId}
			messages={messages}
			name={name}
			subdomain={subdomain}
			description={description}
			welcomeMessage={welcomeMessage}
			systemPrompt={systemPrompt}
		/>
	);
}
