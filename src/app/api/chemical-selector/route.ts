import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an APW chemical product specialist for 
Alkota UK. You recommend the correct cleaning chemical 
from the APW range based on the surface, contamination 
type, and any restrictions provided.

The full APW chemical range is:
- Raptor: heavy-duty degreaser, vehicles, plant, machinery, concrete floors. Not food-safe.
- Farm Soap: agricultural, animal housing, trailers, farm equipment. Biodegradable.
- Brown Wonder: general purpose vehicle wash, safe on paint and vehicle surfaces.
- CarbonTuf: carbon and baked-on grease removal, exhaust systems, engine bays. Strong alkali.
- Cal Clean: descaler, mineral scale removal, coil cleaning.
- Masonry Clean Off: brick, stone, mortar staining, efflorescence.
- Crete Clean: concrete, cement, masonry surfaces.
- HydroRX Clean: general surface preparation and brightening.
- Graffiti OFF: paint graffiti on hard surfaces.
- Graffiti Eradicator: permanent marker and spray paint on porous surfaces.
- Spray Away: light duty all-surface cleaner.
- AV Wash: aircraft and aviation equipment wash. Aviation-approved.
- Bio Asphalt Remover: bitumen, tarmac, asphalt.
- Asphalt & Tar Remover: petroleum-based tar and road film.

Always output a JSON object with these exact keys:
{
  "primaryChemical": "...",
  "primaryRationale": "...",
  "dilutionHotWash": "...",
  "dilutionColdWash": "...",
  "dilutionFoamLance": "...",
  "applicationMethod": "...",
  "contactTime": "...",
  "doNotUseOn": "...",
  "secondaryChemical": "..." or null,
  "secondaryRationale": "..." or null,
  "safetyNote": "..." or null
}

Output ONLY the JSON. No preamble, no backticks.`;

export async function POST(req: NextRequest) {
  try {
    const { surface, contamination, restrictions } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not defined');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const resArray = Array.isArray(restrictions) ? restrictions.join(', ') : 'None';

    const userPrompt = `Surface: ${surface}
Contamination: ${contamination}
Restrictions: ${resArray}
Recommend the correct APW chemical.`;

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
    
    replyText = replyText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const recommendation = JSON.parse(replyText);
    return NextResponse.json(recommendation);

  } catch (error) {
    console.error('Chemical Selector API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
