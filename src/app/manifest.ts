import { loadTranslation } from "@/i18n/loadTranslation";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const locale = "en";
	const translation = await loadTranslation(locale);

	return {  
		name: translation.home.title,
		start_url: "/",
		theme_color: "#101E33",
	};
}
