import { type Locale, i18nConfig } from "@/i18n";
import logger from "@/logger";

type TranslationModule = {
	chat: {
		aiDisclaimer: string;
		placeholder: string;
		send: string;
		welcomeMessage: string;
		errorMessage: string;
		copyToClipboard: string;
		copied: string;
		textToSpeech: string;
		rateResponse: string;
	};
	common: {
		loading: string;
		error: string;
		notFound: string;
		back: string;
		next: string;
		submit: string;
		cancel: string;
		poweredBy: string;
		backToMainSite: string;
	};
	nav: {
		localeSelector: {
			message: string;
		};
	};
	home: {
		title: string;
		description: string;
		createChatbotButton: string;
		learnMoreButton: string;
	};
};


// Create a type from imported translation file that corresponds to the default locale.
// All of the translation files should have the same key structure to avoid errors.
export type TranslationObject = TranslationModule
/**
 * Loads a translation file as a module based on a given locale.
 *
 * @param {Locale} locale -  A locale that specifies which translation is loaded.
 * @returns {TranslationObject} Translation object.
 */
export const loadTranslation = async (
	locale: Locale,
): Promise<TranslationObject> => {
	try {
		logger.lug("[Translation] Loading translation for locale", { locale });
		const translations = await import('../../translations.json');
		const translation = translations[locale as keyof typeof translations] as TranslationObject;		
		logger.lug("[Translation] Successfully loaded translation", { locale });
		return translation as TranslationObject;
	} catch (error) {
		logger.error("[Translation] Failed to load translation", { locale, error });
		// Fallback to default locale if translation fails
		if (locale !== i18nConfig.defaultLocale) {
			logger.lug("[Translation] Falling back to default locale", {
				defaultLocale: i18nConfig.defaultLocale,
			});
			return loadTranslation(i18nConfig.defaultLocale);
		}
		throw error;
	}
};
