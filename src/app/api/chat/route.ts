import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { MACHINES } from '@/lib/machines';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Fetch all machines from Sanity to provide context to the AI
    const machines = await client.fetch(`*[_type == "machine"] {
      name,
      modelCode,
      tagline,
      category,
      "series": series->name,
      specs,
      eliteFeatures
    }`);

    const productContext = JSON.stringify(machines.map((m: any) => ({
      name: m.name,
      id: m.modelCode,
      series: m.series,
      category: m.category,
      specs: m.specs,
      highlights: m.eliteFeatures
    })), null, 2);

    const DEFAULT_SYSTEM_PROMPT = `
You are the Alkota UK Technical Advisor — an expert in 
industrial pressure washing and high-pressure cleaning systems.

You have deep knowledge of the full Alkota product range. 
USE THE FOLLOWING LIVE PRODUCT CATALOGUE DATA FROM SANITY STUDIO TO PROVIDE PRECISE TECHNICAL ANSWERS:
${productContext}

You help visitors:
- Select the right machine for their specific application (Hot Water, Cold Water, Steam, Parts Washers)
- Explain the hierarchy: Category (e.g. Hot Water) -> Series (e.g. X4) -> Model (e.g. 420X4)
- Understand technical specs like PSI vs flow rate (GPM/LPM)
- Troubleshoot common faults and recommend service calls
- Request a quote for equipment (no public pricing)

You are authoritative, technical, and confident. Alkota machines are premium, hand-built, industrial-grade equipment — best in class.
`;

    // Fetch AI settings from Sanity (server-side only)
    const settings = await client.fetch(`*[_type == "siteSettings"][0].aiChatGroup`);
    
    const apiKey = settings?.claudeApiKey || process.env.ANTHROPIC_API_KEY;
    const systemPrompt = settings?.systemInstructions || DEFAULT_SYSTEM_PROMPT;

    if (!apiKey) {
      console.error('No Claude API key found in Sanity or environment variables');
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || '';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
