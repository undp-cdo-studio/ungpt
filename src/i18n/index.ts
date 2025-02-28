// Internationalization (i18n) configuration object.
// Exported as const to be read-only.

export const locales = ["en", "fr", "es", "de", "it", "ja", "ko", "zh", "ar"] as const;

export const i18nConfig = {
	// Sets a default locale.
	defaultLocale: "en" as const,
	// Supported locales found in @/translations directory.
	locales: locales,
	// Add prefixDefault to control whether default locale should be prefixed
	prefixDefault: true,
	// Add cookie name for storing user's preferred locale
	cookieName: "NEXT_LOCALE",
} as const;
  
// Exports a type from the i18nConfig, can represent any locale in locales array.
export type Locale = (typeof i18nConfig)['locales'][number];

// Export a type for translation objects
export type TranslationModule = {
  [key: string]: string | TranslationModule;
};

// Export type for translation functions
export type TranslationFunction = (key: string, params?: Record<string, string | number>) => string;

// Export helper to check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

// Export helper to get default locale
export function getDefaultLocale(): Locale {
  return i18nConfig.defaultLocale;
}

// Export helper to get all supported locales
export function getSupportedLocales(): readonly Locale[] {
  return i18nConfig.locales;
} 

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
} 