import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a UK environmental compliance consultant 
specialising in industrial wash bays, trade effluent, 
and chemical handling for businesses operating 
pressure washing equipment.

You have deep knowledge of:
- Trade effluent consents (Water Industry Act 1991)
- The Environmental Permitting Regulations 2016
- COSHH Regulations 2002 (Control of Substances 
  Hazardous to Health)
- PPG2: Above Ground Oil Storage
- PPG6: Working at Demolition, Construction and 
  Recycling Sites (drainage)
- The Water Resources Act 1991 (surface water protection)
- Bunding requirements for wash bays handling 
  chemicals or oils
- Drainage Infrastructure Planning

You produce clear, practical, sector-specific compliance 
reports. Reference actual UK regulations. Be specific 
about what a business must do, not just general guidance.

Output a JSON object with these exact keys:
{
  "overallRiskLevel": "Compliant" /* or "Advisory" or "Non-Compliant" */,
  "riskSummary": "...",
  "tradeEffluent": {
    "requiresConsent": true, /* or false */
    "explanation": "...",
    "actionRequired": "..."
  },
  "coshhObligations": {
    "assessmentRequired": true, /* or false */
    "explanation": "...",
    "actionRequired": "..."
  },
  "environmentalPermit": {
    "mayBeRequired": true, /* or false */
    "explanation": "...",
    "actionRequired": "..."
  },
  "bunding": {
    "recommendationLevel": "Required" /* or "Recommended" or "Not Required" */,
    "explanation": "...",
    "actionRequired": "..."
  },
  "recommendedAlkotaEquipment": ["...", "..."],
  "nextSteps": ["...", "...", "..."],
  "disclaimer": "This report is for guidance only and does not constitute legal advice. Always confirm requirements with your local water company, Environment Agency, and a qualified consultant."
}

Output ONLY the JSON. No preamble, no backticks.`;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not defined');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const userPrompt = `Wash bay profile:
1. Site type: ${answers['Q1'] || 'Not specified'}
2. Wash water discharge: ${answers['Q2'] || 'Not specified'}
3. Chemicals currently used: ${answers['Q3'] || 'Not specified'}
4. Trade effluent consent in place: ${answers['Q4'] || 'Not specified'}
5. COSHH assessments for chemicals: ${answers['Q5'] || 'Not specified'}
6. Wash area bunded or contained: ${answers['Q6'] || 'Not specified'}
7. Washes vehicles carrying hazardous materials: ${answers['Q7'] || 'Not specified'}
8. Approximate daily wash water volume: ${answers['Q8'] || 'Not specified'}

Produce a compliance report.`;

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
      return NextResponse.json({ error: 'Failed to generate compliance report' }, { status: 500 });
    }

    const data = await response.json();
    let replyText = data.content?.[0]?.text || '';
    
    replyText = replyText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const report = JSON.parse(replyText);
    return NextResponse.json(report);

  } catch (error) {
    console.error('Wash Bay Compliance API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
