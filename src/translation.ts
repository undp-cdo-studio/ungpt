import { useLocale } from "next-intl";
import type { Locale } from "./i18n";
import { getTranslation } from "./i18n/getTranslation";

export function useTranslation() {
	const locale = useLocale();

	const t = getTranslation(locale as Locale);
	return t;
}
;