'use client';

import LocaleSelector from "@/components/locale-selector";
import type { Locale } from "@/i18n";

export function LocaleSelectorWrapper({ message, locale }: { message: string; locale: Locale }) {
	return <LocaleSelector message={message} locale={locale} />;
} 