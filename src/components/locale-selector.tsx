"use client";

import { type Locale, i18nConfig } from "@/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
	message: string;
	locale: Locale;
}

const redirectToLocale = (locale: Locale, pathname: string) => {
	// If pathname is not found, return "/" as the redirection path.
	if (!pathname) {
		
		return "/";
	}

	// Split pathaname as substrings in to an array, using "/" as a pattern.
	const pathParts = pathname.split("/");

	// Set the array index 1 as the locale, this position contains the locale.
	pathParts[1] = locale;

	// Join the locale with "/" to get a valid URL path.
	const url = pathParts.join("/");

	// Return with locale.
	return url;
};

const localeInfo: Record<Locale, { native: string; default: string }> = {
	en: { native: "English", default: "English" },
	fr: { native: "Français", default: "French" },
	es: { native: "Español", default: "Spanish" },
	de: { native: "Deutsch", default: "German" },
	it: { native: "Italiano", default: "Italian" },
	ja: { native: "日本語", default: "Japanese" },
	ko: { native: "한국어", default: "Korean" },
	zh: { native: "中文", default: "Chinese" },
	ar: { native: "العربية", default: "Arabic" }	
} as const;

function LocaleModal({ 
	isOpen, 
	onClose, 
	message, 
	pathname,
}: { 
	isOpen: boolean; 
	onClose: () => void; 
	message: string;
	pathname: string;
}) {
	if (!isOpen) return null;

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	return createPortal(
		<dialog 
			className="fixed inset-0 z-50 flex items-start justify-center bg-transparent p-0 m-0 w-full h-full"
			open={isOpen}
			onKeyDown={handleKeyDown}
		>
			{/* Backdrop */}
			<div 
				className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
				onClick={onClose}
				onKeyDown={handleKeyDown}
				tabIndex={0}
				role="button"
				aria-label="Close language selector"
			/>
			
			{/* Modal content */}
			<div className="relative mt-16 w-80 rounded-lg border border-neutral-200 bg-white shadow-lg">
				<div className="px-4 py-3 border-b border-neutral-200">
					<h1 id="locale-modal-title" className="text-lg font-medium">{message}</h1>
				</div>
				<ul className="flex w-full flex-col divide-y divide-neutral-200 max-h-[60vh] overflow-y-auto">
					{i18nConfig.locales.map((locale: Locale) => (
						<Link 
							key={`${locale}-selector`} 
							href={redirectToLocale(locale, pathname)}
							onClick={onClose}
						>
							<li className="flex w-full flex-col items-start justify-center px-4 py-2.5 hover:bg-neutral-100 transition-colors duration-200">
								<h2 className="text-md font-medium text-neutral-950">
									{localeInfo[locale].native}
								</h2>
								<p className="text-xs text-neutral-600">
									{localeInfo[locale].default}
								</p>
							</li>
						</Link>
					))}
				</ul>
			</div>
		</dialog>,
		document.body
	);
}

export default function LocaleSelector({ message, locale }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	// Handle mounting for client-side portal
	useEffect(() => {
		setMounted(true);
	}, []);

	// Function to get the language shortcode based on locale
	const getLanguageShortcode = (locale: Locale) => {
		console.log("getLanguageShortcode", locale);
		const shortcodes: Record<Locale, string> = {
			en: "EN",
			fr: "FR",
			es: "ES",
			de: "DE",
			it: "IT",
			ja: "JA",
			ko: "KO",
			zh: "ZH",
			ar: "AR"
		};
		return shortcodes[locale];
	};

	return (
		<>
			{/* Language button with shortcode and dropdown icon */}
			<button
				type="button"
				className={`flex items-center h-12 px-4 rounded-lg hover:bg-neutral-100 transition-all duration-300 ${
					isOpen ? "bg-neutral-100" : ""
				}`}
				onClick={() => setIsOpen(true)}
				aria-label="Select language"
				aria-expanded={isOpen}
				aria-haspopup="dialog"
			>
				<span className="text-xl">{getLanguageShortcode(locale)}</span> {/* Display language shortcode */}
				<DropdownIcon isOpen={isOpen} /> {/* Dropdown icon */}
			</button>

			{mounted && (
				<LocaleModal 
					isOpen={isOpen} 
					onClose={() => setIsOpen(false)} 
					message={message}
					pathname={pathname}
				/>
			)}
		</>
	);
}

// Dropdown icon component
function DropdownIcon({ isOpen }: { isOpen: boolean }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={`h-6 w-6 ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
			aria-hidden="true"
			role="img"
			aria-label="Dropdown icon"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 9l6 6 6-6"
			/>
		</svg>
	);
}
