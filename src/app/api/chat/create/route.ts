import { DatabaseService } from '@/db/services';
import logger from '@/logger';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const props = await req.json();
    const result = await DatabaseService.createChat(props);
    
    logger.api('Chat created', result);

    return NextResponse.json(result)
  } catch (error: unknown) {
    logger.error('Chat API Error', { error });
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
