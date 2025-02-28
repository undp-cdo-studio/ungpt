import logger from "@/logger";
import { headers } from "next/headers";



const mainDomain = new URL(process.env.NEXT_PUBLIC_APP_DOMAIN as string).host;

export function getSubdomain(originalHost: string): string | null {
	// Clean and normalize the host
	const cleanHost = originalHost.toLowerCase().replace(/^www\./, "");
	
	logger.api("Subdomain extraction:", {
		originalHost,
		cleanHost,
		mainDomain,
		hasMainDomain: cleanHost.includes(mainDomain)
	});

	if (!mainDomain) {
		logger.error("Main domain not configured in environment");
		return null;
	}

	if (cleanHost === mainDomain) {
		return null;
	}

	if (cleanHost.includes(mainDomain)) {
		const parts = cleanHost.split(".");
		const subdomainPart = parts[0];
		
		logger.api("Extracted subdomain:", {
			parts,
			subdomainPart,
		});
		
		return subdomainPart || null;
	}

	return null;
}

export function getSubdomainFromPage(): string | null {
	const host = headers().get("host");
	logger.api("Processing host header:", { host });

	if (!host) {
		logger.warn("No host header found");
		return "www";
	}

	const subdomain = getSubdomain(host);

	const noSub =
		subdomain === null ||
		subdomain === undefined ||
		subdomain === "" ||
		subdomain === "www" ||
		subdomain === mainDomain;

	logger.api("Subdomain resolution:", { 
		subdomain, 
		mainDomain, 
		noSub,
	});

	if (noSub) {
		return null;
	}

	return subdomain;
}