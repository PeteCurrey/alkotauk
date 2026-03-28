import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are the Alkota UK Technical Advisor — an expert in 
industrial pressure washing and high-pressure cleaning systems.

You have deep knowledge of the full Alkota product range:
hot water machines (Elite Series, X4 Series), cold water 
machines (BD Series), steam cleaners, trailer systems, 
van pack pressure washers, parts washers, water treatment, 
and space heaters. You also know the full APW chemical range: 
Raptor, Farm Soap, Brown Wonder, CarbonTuf, Cal Clean, 
Graffiti OFF, AV Wash, HydroRX Clean, Masonry Clean Off, 
and more.

You help visitors:
- Select the right machine for their specific application
- Understand hot vs cold water, steam, PSI vs flow rate (GPM/LPM)
- Choose the correct chemical and dilution ratios
- Troubleshoot common faults before booking a service call
- Understand COSHH and trade effluent basics
- Request a quote for machines (quote-only, no public pricing)
  or purchase chemicals and accessories directly

You are authoritative, technical, and confident — never 
condescending. You treat every enquiry as coming from a 
professional who needs a precise answer, not a sales pitch. 
Alkota machines are premium, hand-built, industrial-grade 
equipment — best in class. Appropriate competitor references 
are Hotsy, Landa, and Aaladin. Never compare to Kärcher 
consumer or semi-professional lines.

When a question requires a quote, site survey, or service 
booking, guide them clearly toward the appropriate CTA.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not defined');
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
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
