export * from "@/db/schema";
import { Locale } from "@/i18n";
import { TranslationObject } from "@/i18n/loadTranslation";

export type Action = {
    icon: string;
    id: string;
    label: string;
    url: string;
    description: string;
};



export type Organization = {
    id: string;
    name: string;
    subdomain: string;
    homePage: string | null;
    description: string;
    systemPrompt: string;
    requireAuth: boolean | null;
    disabled: boolean | null;
    assistantId: string | null;
    createdAt: Date;
    updatedAt: Date;
    actions: Action[] | null;
};

export type TranslationProps = {
    locale: Locale;
    translation: TranslationObject; 
}

export type LayoutProps = {
    children: React.ReactNode;
    params: {
        locale: Locale;
    };
} 