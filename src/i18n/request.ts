import { getRequestConfig } from "next-intl/server";
import { type Locale, routing } from "./routing";

// Define the type for the translations
type Messages = {
	[key in Locale]: {
		common: {
			loading: string;
			error: string;
			notFound: string;
			back: string;
			next: string;
			submit: string;
			cancel: string;
		};
		nav: {
			localeSelector: {
				message: string;
			};
		};
		chat: {
			placeholder: string;
			send: string;
			aiDisclaimer: string;
			welcomeMessage: string;
			errorMessage: string;
			copyToClipboard: string;
			copied: string;
			textToSpeech: string;
			rateResponse: string;
		};
		home: {
			title: string;
			description: string;
			createChatbotButton: string;
			learnMoreButton: string;
		};
	};
};

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale;

	// Ensure that the incoming `locale` is valid
	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale;
	}
	const messages = (await import('../../translations.json')).default as Messages;

	return {
		locale,
		messages: messages[locale as Locale],
	};
});
