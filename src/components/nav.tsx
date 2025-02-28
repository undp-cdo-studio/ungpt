import { LocaleSelectorWrapper } from "@/components/locale-selector-wrapper";
import type { Locale } from "@/i18n";
import { getTranslation } from "@/i18n/getTranslation";

export default async function Nav({ locale }: { locale: Locale }) {
	const translation = await getTranslation(locale);
	return (
		<nav className="absolute flex h-16 w-full items-center justify-end border-b border-b-neutral-200 bg-white px-8 lg:px-96">
			<div>
				<LocaleSelectorWrapper message={translation("nav.localeSelector.message")} locale={locale} />
			</div>
		</nav>
	);
}
