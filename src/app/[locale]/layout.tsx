import type { Locale } from "@/i18n";
import { loadTranslation } from "@/i18n/loadTranslation";
import { getOrg } from "@/lib/orgs";
import { getSubdomainFromPage } from "@/subdomain";

import NotFound from "@/components/chat/not-found";

import { Header } from "@/components/layout/header";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
 
  const { children, params } = props;
  const { locale } = params;
  const translation = await loadTranslation(locale);
  const subdomain = getSubdomainFromPage();
  const org = subdomain ? await getOrg(subdomain) : null;

  if (!org && subdomain) {
    return <NotFound />;
  }
  return (
    <main>
    <div className="flex flex-col min-h-screen">
    <Header
      transparent
      chooseLocale
      locale={locale}
      name={org?.name}
      translation={translation}
      homePage={org?.homePage}
    />
    {/* <Banner /> */}
    {children}
    </div>
    {/* <Footer /> */}
  </main>
  );
}
