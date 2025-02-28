import logger from '@/logger';
import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

interface UrlData {
    url: string;
    title: string;
    description: string;
    image: string;
}

async function extractOpenGraphMetadata(url: string): Promise<UrlData> {
    logger.init('extractOpenGraphMetadata');
    logger.api(`Extracting Open Graph metadata from ${url}`);      
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const metaTags = dom.window.document.querySelectorAll('meta');

    const metadata: Record<string, string> = {};

    metaTags.forEach((tag) => {
        const property = tag.getAttribute('property') || tag.getAttribute('name');
        const content = tag.getAttribute('content');
        if (property && content) {
            metadata[property] = content;
        }
    });

    return {
        url,
        title: metadata['og:title'] || metadata['twitter:title'] || dom.window.document.title || '',
        description: metadata['og:description'] || metadata['twitter:description'] || '',
        image: metadata['og:image'] || metadata['twitter:image'] || '',
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const urls: string[] = body.urls || [];

        logger.api(`Starting extraction from URLs: ${urls}`);

        const metadataList = await Promise.all(urls.map((url) => extractOpenGraphMetadata(url)));

        logger.api(`Successfully extracted Open Graph metadata from ${metadataList.length} URLs`);
        logger.debug(`Extracted data: ${JSON.stringify(metadataList, null, 2)}`);

        return NextResponse.json(metadataList);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching metadata', details: (error as Error).message }, { status: 500 });
    }
}