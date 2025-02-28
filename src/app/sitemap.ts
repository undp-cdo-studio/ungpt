import { type Locale, getPathname, routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [getEntry("/"), getEntry("/pathnames")];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntry(href: Href) {
	return {
		url: getUrl(href, routing.defaultLocale),
		alternates: {
			languages: Object.fromEntries(
				routing.locales.map((locale) => [locale, getUrl(href, locale)]),
			),
		},
	};
}

function getUrl(href: Href, locale: Locale) {
	const pathname = getPathname({ locale, href });
	return process.env.NEXT_PUBLIC_APP_DOMAIN + pathname;
}
