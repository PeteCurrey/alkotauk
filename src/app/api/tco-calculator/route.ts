import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an industrial equipment cost analyst. 
You produce clear, credible 5-year total cost of 
ownership comparisons between generic pressure 
washer brands and premium Alkota equipment for 
UK businesses.

Use realistic UK industry benchmarks:
- Generic machine purchase: £800–£2,500 for the 
  relevant spec bracket
- Alkota equivalent: £3,500–£12,000 depending on spec
- Generic machine average service calls: 2–4 per year 
  after year 2
- Alkota average service calls: 0.5–1 per year 
  (7-year coil warranty, quality components)
- UK engineer call-out: £180–£350 + parts
- Alkota chemical efficiency vs generic: 
  APW chemicals typically 15–25% more efficient 
  at equivalent dilution due to formulation
- UK diesel: approximately £1.30/litre
- UK electricity (business rate): approximately 
  £0.24/kWh

Output a JSON object with these exact keys:
{
  "genericMachine": {
    "purchasePrice": 0,
    "year1Cost": 0,
    "year3Cost": 0,
    "year5TotalCost": 0,
    "breakdownNotes": "..."
  },
  "alkotaMachine": {
    "purchasePrice": 0,
    "year1Cost": 0,
    "year3Cost": 0,
    "year5TotalCost": 0,
    "breakdownNotes": "..."
  },
  "savingsOverFiveYears": 0,
  "breakevenPoint": "...",
  "downtimeCostAnnual": 0,
  "downtimeCostNote": "...",
  "chemicalSavingsAnnual": 0,
  "keyInsights": ["...", "...", "..."],
  "recommendation": "..."
}

All cost figures in numerical GBP (£) format where the type is number. 
Output ONLY the JSON. No preamble, no backticks.`;

export async function POST(req: NextRequest) {
  try {
    const { inputs } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not defined');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const {
      machineType, dailyHours, daysPerWeek,
      currentMachine, breakdownFrequency, repairCost,
      labourCost, chemicalSpend, powerSource
    } = inputs || {};

    const userPrompt = `Calculate a 5-year TCO for this business:
Machine type needed: ${machineType}
Daily usage hours: ${dailyHours}
Days per week: ${daysPerWeek}
Current machine situation: ${currentMachine}
Current breakdown frequency: ${breakdownFrequency || 'N/A (new buyer)'}
Average repair cost per call: £${repairCost || '0'}
Labour cost per hour (downtime cost): £${labourCost}
Current monthly chemical spend: £${chemicalSpend}
Power source: ${powerSource}`;

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
      return NextResponse.json({ error: 'Failed to generate TCO model' }, { status: 500 });
    }

    const data = await response.json();
    let replyText = data.content?.[0]?.text || '';
    
    replyText = replyText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const report = JSON.parse(replyText);
    return NextResponse.json(report);

  } catch (error) {
    console.error('TCO Calculator API Error:', error);
    return NextResponse.json({ error: 'Something went wrong processing your request' }, { status: 500 });
  }
}
