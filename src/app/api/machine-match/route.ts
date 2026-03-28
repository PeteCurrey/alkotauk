import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an Alkota UK product specialist with expert 
knowledge of the full machine range. Based on a 
visitor's application answers, you produce a precise, 
confident recommendation report.

You always recommend from the Alkota range only:
- Hot water: Elite Series, X4 Series (420X4, 520X4, 530X4, 
  4301 NG/LP etc.)
- Cold water: BD Series (216BD2, 311BD3, 420BD, 430BD, 530BD)
- Steam cleaners: oil-fired and dry steam generators
- Trailer systems: single and tandem axle
- Van pack systems: vehicle-mounted mobile wash units
- Parts washers: for engineering and workshop environments

You always output your recommendation as a structured 
JSON object with these exact keys:
{
  "recommendedMachine": "...",
  "series": "...",
  "whyThisMachine": "...",
  "keySpecs": ["...", "...", "..."],
  "recommendedChemical": "...",
  "chemicalRationale": "...",
  "dilutionGuide": "...",
  "recommendedAccessories": ["...", "...", "..."],
  "alternativeMachine": "...",
  "alternativeRationale": "...",
  "importantNotes": "..."
}

Output ONLY the JSON object. No preamble, no markdown 
backticks.`;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not defined');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const userPrompt = `Based on these answers, recommend the best Alkota machine:
1. What are you cleaning? ${answers['Q1'] || 'Not specified'}
2. Contamination type? ${answers['Q2'] || 'Not specified'}
3. Where is the machine used? ${answers['Q3'] || 'Not specified'}
4. Power source available? ${answers['Q4'] || 'Not specified'}
5. How many operators at once? ${answers['Q5'] || 'Not specified'}
6. Daily usage hours? ${answers['Q6'] || 'Not specified'}
7. Budget level? ${answers['Q7'] || 'Not specified'}
8. Any specific requirements? ${answers['Q8'] || 'Not specified'}`;

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
      return NextResponse.json({ error: 'Failed to generate recommendation' }, { status: 500 });
    }

    const data = await response.json();
    let replyText = data.content?.[0]?.text || '';
    
    // Attempt to clean JSON if there are backticks
    replyText = replyText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const recommendation = JSON.parse(replyText);
    return NextResponse.json(recommendation);

  } catch (error) {
    console.error('Machine Match API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
