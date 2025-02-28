import { getChat } from '@/lib/chat';
import logger from '@/logger';
import type { NextRequest } from 'next/server';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const stream = true;

export async function POST(req: NextRequest) {
  try {
    const props = await req.json();
    if (stream) {
      const result = await getChat({ ...props, stream: true });
      return result.toDataStreamResponse()
    } else {
      ;const result = await getChat(props);
      return result
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('Chat API Error', { error });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
