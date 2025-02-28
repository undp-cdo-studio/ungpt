import "@/app/styles.css";
import { Providers } from "@/components/chat/providers";
import type { Locale } from "@/i18n";
import { getOrg } from "@/lib/orgs";
import logger from "@/logger";
import { getSubdomainFromPage } from "@/subdomain";
import { cn } from "@/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import NotFound from "@/components/chat/not-found";

export const generateMetadata = async (): Promise<Metadata> => {
  const slug = process.env.NEXT_PUBLIC_APP_SLUG as string;
  const baseUrl = process.env.NEXT_PUBLIC_APP_DOMAIN as string;
  const appName = process.env.NEXT_PUBLIC_APP_NAME as string;
  const appDescription = process.env.APP_DESCRIPTION as string;

  const subdomain = getSubdomainFromPage();
  if (!subdomain) {
    return {
      metadataBase: new URL(baseUrl),
      title: {
        default: appName,
        template: `%s | ${appName}`,
      },
      description: appDescription,
    };
  }

  const result = await getOrg(subdomain);
  logger.lug("result", baseUrl);

  const title = result?.name ?? appName;
  const description = result?.description ?? appDescription;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${appName}`,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: baseUrl,
      images: [
        {
          url: result ? `/api/og?subdomain=${result.subdomain}` : "/api/og",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: result ? [`/api/og?subdomain=${result.subdomain}`] : ["/api/og"],
    },
    icons: {
      icon: `/${slug}/favicon.ico`,
      shortcut: `/${slug}/favicon-16x16.png`,
      apple: `/${slug}/apple-touch-icon.png`,
    },
  };
};


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function RootLayout(props: RootLayoutProps) {
  console.log("RootLayout", props);
  const { children, params } = props;
  const { locale } = params;
  const subdomain = getSubdomainFromPage();
  const org = subdomain ? await getOrg(subdomain) : null;

  if (!org && subdomain) {
    return <NotFound />;
  }

  return (
    <html lang={locale} className={cn(GeistSans.variable, GeistMono.variable)}>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
