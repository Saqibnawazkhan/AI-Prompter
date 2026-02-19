import { NextRequest, NextResponse } from 'next/server';
import { generatePrompt } from '@/lib/generators';
import { PromptCategory, FormData } from '@/types';

export async function POST(request: NextRequest) {
  let category: PromptCategory;
  let formData: FormData;

  try {
    const body = await request.json();
    category = body.category;
    formData = body.formData;

    if (!category || !formData) {
      return NextResponse.json(
        { error: 'Missing category or formData' },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const basePrompt = generatePrompt(category, formData);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ prompt: basePrompt, source: 'template' });
  }

  try {
    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an expert prompt engineer. You will be given a structured prompt template that was generated from user inputs. Your job is to enhance this prompt to make it more detailed, professional, and effective.

Rules:
- Maintain the same general structure and markdown formatting
- Add more specific details, best practices, and expert insights
- Keep the same category focus (${category})
- Make the prompt more actionable and comprehensive
- Preserve all the user's original requirements and specifications
- Do not add fictional data or make assumptions beyond what is provided
- Output ONLY the enhanced prompt text — no preamble, no meta-commentary, no "Here is the enhanced prompt:" prefix`,
            },
            {
              role: 'user',
              content: `Here is the base prompt template to enhance:\n\n${basePrompt}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 4096,
        }),
      }
    );

    if (!groqResponse.ok) {
      console.error('Groq API error:', groqResponse.status);
      return NextResponse.json({
        prompt: basePrompt,
        source: 'template',
        error: 'AI enhancement failed, using template prompt',
      });
    }

    const groqData = await groqResponse.json();
    const enhancedPrompt = groqData.choices?.[0]?.message?.content;

    if (!enhancedPrompt) {
      return NextResponse.json({
        prompt: basePrompt,
        source: 'template',
        error: 'Empty response from AI, using template prompt',
      });
    }

    return NextResponse.json({ prompt: enhancedPrompt, source: 'ai' });
  } catch (error) {
    console.error('Groq API request failed:', error);
    return NextResponse.json({
      prompt: basePrompt,
      source: 'template',
      error: 'AI enhancement failed, using template prompt',
    });
  }
}
