import { Header } from "@/components/layout/header";
import type { TranslationProps } from "@/types/types";
import Link from "next/link";

type Props = TranslationProps;

export default async function HomePage({
	locale,
	translation,
}: Props) {


	// const orgs = await getAllOrgs();

	function HeroSection() {
		return (
			<div className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-8 shadow-xl">
				<div className="mb-12 my-12 *:text-gray-900">
					<h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
						{translation.home.title}
				</h1>
				<p className="text-xl text-gray-700 mb-12 *:text-gray-900">
					{translation.home.description}
					</p>
				</div>
				<div className="h-6" />
				<div className="flex flex-col sm:flex-row gap-4 py-12">
					<Link
						href="/new"
						className="inline-flex justify-center items-center bg-[#0468b1] text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg group"
					>
						{translation.home.createChatbotButton}
						<svg
							className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
							fill="none"
								viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
							aria-label="Arrow right"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</Link>
					<Link
						href="https://www.undp.org"
						className="inline-flex justify-center items-center border-2 border-[#0468b1] text-[#0468b1] px-8 py-3 rounded-md hover:bg-blue-50 transition-colors text-lg"
					>
						{translation.home.learnMoreButton}
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="relative flex flex-col min-h-screen bg-blue-50">
				<Header
					showSignIn={true}
					translation={translation}
					chooseLocale={true}
					locale={locale}
				/>	
				{/* Hero Section */}
				<main className="flex-1 flex items-center justify-center px-4 py-16">
					<div className="w-full">
						<HeroSection />
					</div>
				</main>
			</div>
		</>
	);
}
