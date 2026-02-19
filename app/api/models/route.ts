import { NextResponse } from 'next/server';

const MODELS = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    description: 'Most capable, best quality output',
    speed: 'medium',
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    description: 'Ultra-fast responses',
    speed: 'fast',
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    description: 'Great balance of speed and quality',
    speed: 'fast',
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    description: 'Compact and efficient',
    speed: 'fast',
  },
];

export async function GET() {
  return NextResponse.json({ models: MODELS, default: 'llama-3.3-70b-versatile' });
}
