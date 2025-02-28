
import { ChatClient } from '@/components/chat/chat';
import type { Locale } from '@/i18n';
import { loadTranslation } from '@/i18n/loadTranslation';
import { getOrg } from '@/lib/orgs';
import { getSubdomainFromPage } from '@/subdomain';

type Props = {
    params: {
    locale: Locale;
  };
};

export default async function Chat(props: Props) {

  const { locale } = props.params;
  const translation = await loadTranslation(locale);

  const subdomain = getSubdomainFromPage();

  const org = subdomain ? await getOrg(subdomain) : null  ; 

  return <ChatClient
          locale={locale} 
          translation={translation}
          welcomeMessage={org?.description ?? translation.chat.welcomeMessage}
          {...org}
        />
}
