"use client";

import type { Locale } from "@/i18n";
import { i18nConfig } from "@/i18n";
import logger from "@/logger";
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
} from "@azure/msal-react";
import Image from "next/image";
import Link from "next/link";

// make all clientdata optional

export const LoggedIn = AuthenticatedTemplate;
export const LoggedOut = UnauthenticatedTemplate;

type HeaderProps = {
  showSignIn?: boolean;
  transparent?: boolean;
  colour?: string;
  clientData?: ClientData;
  navigationOptions?: Array<{ label: string; href: string }>;
  name?: string;
  locale?: Locale;
  homePage?: string | null;
  onSignIn?: () => void;
  chooseLocale?: boolean;
  translation?: TranslationObject;
};

import type { ClientData } from "@/data";
import type { TranslationObject } from "@/i18n/loadTranslation";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import LocaleSelector from "../locale-selector";

export function Header({
  showSignIn,
  transparent = false,
  colour = "blue",
  navigationOptions,
  name,
  locale = i18nConfig.defaultLocale,
  homePage,
  chooseLocale = false,
  translation,
}: HeaderProps) {
  const title = name || process.env.NEXT_PUBLIC_APP_NAME;

  logger.lug("name", name);
  logger.lug("homePage", homePage);

  return (
    <>
      <header
        className={`from-background/10 via-background/50 to-background/80 sticky left-0 right-0 top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl ${transparent ? "bg-transparent" : "bg-white/90 shadow-sm backdrop-blur-sm"} z-50`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex-align items-center flex mt-3"
              aria-label="UNDP"
            >
              <div className="shrink-0 mr-4">
                <Image
                  src={`${colour === "blue" ? "/assets/logo.svg" : "/assets/logo-white.svg"}`}
                  alt="UNDP Logo"
                  height={54}
                  width={54}
                />
              </div>
            </Link>
            <div className="ml-6">
              <div className="">
                <span
                  className={`${colour === "blue" ? "text-gray-700" : "text-white"} text-xs underline underline-offset-2`}
                >
                  UNGPT
                </span>
              </div>
              <div className="flex items-center space-x-4 text-bold text-lg">
                {title}
              </div>
            </div>
          </div>
          {/* Center navigation options */}
          <div className="flex items-center space-x-4">
            {navigationOptions && (
              <div className="flex items-center space-x-6">
                {navigationOptions.map((option) => (
                  <Link
                    key={option.label}
                    href={option.href}
                    className="text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            )}
            {homePage && (
              <Link
                href={homePage}
                className="text-gray-600 transition-colors hover:text-blue-600"
              >
                <button
                  type="button"
                  className="bg-undp flex items-center rounded-md px-6 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  {translation?.common?.backToMainSite}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </button>
              </Link>
            )}
            <div className="flex items-center space-x-4">
              <LocaleSelector message="Select your language" locale={locale} />
              {/* <LoggedOut>
                <button
                  type="button"
                  className="rounded-md bg-[#0468b1] px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </LoggedOut>
              <LoggedIn>
                <UserButton />
              </LoggedIn> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
