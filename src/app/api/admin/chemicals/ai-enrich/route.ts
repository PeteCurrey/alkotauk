import { NextRequest, NextResponse } from 'next/server';
import { generateChemicalMerchandisingSuggestions } from '@/lib/chemicals/ai-enrichment';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { masterCode, masterOriginalName, formulationFamily, retailName, primaryApplication } = body;

    if (!masterCode || !retailName) {
      return NextResponse.json(
        { error: 'masterCode and retailName are required parameters' },
        { status: 400 }
      );
    }

    const suggestions = await generateChemicalMerchandisingSuggestions({
      masterCode,
      masterOriginalName: masterOriginalName || '',
      formulationFamily: formulationFamily || 'Industrial',
      retailName,
      primaryApplication: primaryApplication || 'Commercial Fleet & Industrial Maintenance',
    });

    return NextResponse.json({ success: true, suggestions });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate AI merchandising suggestions' },
      { status: 500 }
    );
  }
}
