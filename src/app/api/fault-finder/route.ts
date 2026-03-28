import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an Alkota-certified field service engineer with 
20+ years of experience diagnosing and repairing industrial 
pressure washing equipment. You diagnose faults methodically 
and accurately.

You know the full Alkota range: Elite Series hot water 
machines, X4 Series, BD Series cold water, steam cleaners, 
trailer systems, and van packs. You know common fault 
patterns in detail: unloader valve wear and bypass, 
pump cavitation (air ingress, inlet restriction), 
burner solenoid failure, thermostat faults, high-limit 
cutout, coil scale build-up reducing heat transfer, 
inlet filter blockage, pressure switch faults, 
hose or fitting leaks, injector block on chemical 
draw, float valve issues in tanks.

Always output a JSON object with these exact keys:
{
  "likelyCause": "...",
  "confidenceLevel": "High / Medium / Low",
  "secondaryCauses": ["...", "..."],
  "operatorChecks": ["...", "...", "..."],
  "whatToTellEngineer": "...",
  "isLikelyWarranty": true or false,
  "recommendedAction": "self-resolve" or "monitor" or "book-service",
  "urgency": "immediate" or "within-week" or "non-urgent",
  "safetyNote": "..." or null
}

Output ONLY the JSON. No preamble, no markdown backticks.`;

export async function POST(req: NextRequest) {
  try {
    const { machineType, symptom, followUps } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not defined');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const followUpsFormat = Object.entries(followUps || {})
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n');

    const userPrompt = `Machine type: ${machineType}
Primary symptom: ${symptom}
Follow-up answers: 
${followUpsFormat}
Diagnose this fault.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return NextResponse.json({ error: 'Failed to generate diagnosis' }, { status: 500 });
    }

    const data = await response.json();
    let replyText = data.content?.[0]?.text || '';
    
    replyText = replyText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const diagnosis = JSON.parse(replyText);
    return NextResponse.json(diagnosis);

  } catch (error) {
    console.error('Fault Finder API Error:', error);
    return NextResponse.json({ error: 'Something went wrong processing your request' }, { status: 500 });
  }
}
