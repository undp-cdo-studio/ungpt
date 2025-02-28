import { getAzureOpenai } from "@/azure-openai";
import logger from "@/logger";
import { getOpenai } from "@/openai";
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { LanguageModelV1 } from "ai";
export async function getModelByProvider() {
    const provider = process.env.NEXT_PUBLIC_LLM_PROVIDER;
    if (provider === 'azure') {
        return await getAzureOpenai();
    }
    if (provider === 'openai') {
        return await getOpenai();
    }   

    return null;
}   


export const openaiModels = {
    "gpt-4o": openai,
    "gpt-4o-mini": openai,
    "gpt-4o-2024-08-06": openai,
    "gpt-4o-2024-02-15": openai,
    "gpt-4o-2024-07-18": openai,
}

type ModelProps = {
    provider?: string;
    model?: string;
}

export async function getModel({ provider, model }: ModelProps = {}): Promise<LanguageModelV1 | null> {


    // const provider = createOpenAICompatible({
    //     name: 'provider-name',
    //     apiKey: process.env.PROVIDER_API_KEY,
    //     baseURL: 'https://api.provider.com/v1',
    //   });

    if (provider) {
        if (provider === 'azure') {
            logger.api("Azure OpenAI key provided, using Azure OpenAI");
            return await getAzureOpenai();
        }
        if (provider === 'openai') {
            logger.api("OpenAI API key provided, using OpenAI");
            return openai(model || "gpt-4o");
        }
        return null;
    }

    // if (process.env.PERPLEXITY_API_KEY) {
    //     const perplexity = createOpenAI({
    //         name: 'perplexity',
    //         apiKey: process.env.PERPLEXITY_API_KEY ?? '',
    //         baseURL: 'https://api.perplexity.ai/',
    //     });
    //     return perplexity("sonar");
    // }


    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        return google('gemini-2.0-flash-thinking-exp')
    }

    if (process.env.AZURE_OPENAI_KEY) {
        logger.api("Azure OpenAI key provided, using Azure OpenAI");
        return await getAzureOpenai();
    }

    if (process.env.OPENAI_API_KEY) {
        logger.api("OpenAI API key provided, using OpenAI");
        return openai("gpt-4o");
    }

    return null;
}   