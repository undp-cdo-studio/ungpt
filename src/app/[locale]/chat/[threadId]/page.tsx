import ChatContainer from '@/components/chat/chat-container';
import NotFound from '@/components/chat/not-found';
import { DatabaseService } from '@/db/services';
import type { Locale } from '@/i18n';
import { loadTranslation } from '@/i18n/loadTranslation';
import { getOrg } from '@/lib/orgs';
import logger from '@/logger';
import { getSubdomainFromPage } from '@/subdomain';

type Props = {
    params: {
    locale: Locale;
    threadId: string;
  };
};

export default async function Chat(props: Props) {
  const { locale, threadId } = props.params;
  const translation = await loadTranslation(locale);
  const subdomain = getSubdomainFromPage();
  const org = subdomain ? await getOrg(subdomain) : null  ; 

 
  const chat = await DatabaseService.getChatById(threadId);

  logger.lug("Chat page with threadId", threadId);
    
  if (!chat) {
    return <NotFound />;
  }
    
  const messages = await DatabaseService.getMessagesByChatId(threadId);
  
  return <ChatContainer
    {...org}
    locale={locale}
    translation={translation}
    threadId={threadId}
    messages={messages}
  />;
}
