import { NextResponse } from 'next/server';

export async function GET() {
  const hasApiKey = !!process.env.GROQ_API_KEY;

  return NextResponse.json({
    status: 'ok',
    ai: hasApiKey ? 'connected' : 'offline',
    timestamp: new Date().toISOString(),
  });
}
