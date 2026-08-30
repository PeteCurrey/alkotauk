// ============================================================================
// ALKOTA UK — CHEMICALS AI ENRICHMENT ENGINE
// Strict Protocol: AI may suggest marketing descriptions, synonyms, and application tags.
// AI NEVER invents chemical composition, hazard statements, pH, dilution, or compliance claims.
// ============================================================================

import { ChemicalMasterFormulation, ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

export interface AIEnrichmentResult {
  suggestedDescriptor?: string;
  suggestedProductPromise?: string;
  suggestedProductStoryHeadline?: string;
  suggestedProductStoryBody?: string;
  suggestedProblemLabels?: string[];
  suggestedApplicationLabels?: string[];
  suggestedShortDescription?: string;
  suggestedApplicationTags?: string[];
  searchSynonyms?: string[];
  seoTitleSuggestion?: string;
  seoDescriptionSuggestion?: string;
  verificationNotice: string;
}

export async function generateChemicalMerchandisingSuggestions(params: {
  masterCode: string;
  masterOriginalName: string;
  formulationFamily: string;
  retailName: string;
  primaryApplication: string;
}): Promise<AIEnrichmentResult> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

  const defaultResult: AIEnrichmentResult = {
    suggestedDescriptor: `Professional ${params.formulationFamily} Formulation`,
    suggestedProductPromise: `Engineered for the stubborn contamination standard detergents leave behind.`,
    suggestedProductStoryHeadline: "THIS ISN'T JUST SOAP.",
    suggestedProductStoryBody: `${params.retailName} is formulated on genuine Alkota ${params.masterCode} (${params.masterOriginalName}) chemistry. Engineered with heat-stable surfactants to dissolve stubborn soils, road film, and industrial grease without harming delicate vehicle clearcoats or machinery surfaces.`,
    suggestedProblemLabels: ['ROAD FILM', 'DIESEL RESIDUE', 'OIL & GREASE', 'WINTER SALT', 'INDUSTRIAL GRIME'],
    suggestedApplicationLabels: ['COMMERCIAL FLEETS', 'HAULAGE HGV', 'WORKSHOP BAYS', 'PLANT MACHINERY'],
    suggestedShortDescription: `Heavy-duty ${params.formulationFamily.toLowerCase()} chemical engineered for ${params.primaryApplication.toLowerCase()}. Backed by Alkota formulation ${params.masterCode}.`,
    suggestedApplicationTags: [params.primaryApplication, 'Pressure Washing', 'Industrial Fleet Maintenance'],
    searchSynonyms: [params.masterCode, params.masterOriginalName, params.retailName, 'TFR', 'industrial wash'],
    seoTitleSuggestion: `${params.retailName} | ${params.masterCode} ${params.masterOriginalName} | Alkota UK`,
    seoDescriptionSuggestion: `Buy ${params.retailName} online from Alkota UK. Genuine ${params.masterCode} formulation in 5L, 20L, and 200L containers with fast UK dispatch.`,
    verificationNotice: 'AI SUGGESTION — REQUIRES HUMAN VERIFICATION BEFORE PUBLISHING',
  };

  if (!apiKey) {
    return defaultResult;
  }

  try {
    // If OpenAI API key is present, perform structured completion
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an industrial chemical copywriting assistant for Alkota UK. Strict rule: NEVER invent chemical hazards, composition, or dilution ratios. Return JSON with keys: suggestedDescriptor, suggestedProductPromise, suggestedProductStoryHeadline, suggestedProductStoryBody, suggestedProblemLabels (array of strings), suggestedApplicationLabels (array of strings), suggestedShortDescription, suggestedApplicationTags, searchSynonyms, seoTitleSuggestion, seoDescriptionSuggestion.',
            },
            {
              role: 'user',
              content: `Generate creative merchandising copy for: Master Chemical ${params.masterCode} (${params.masterOriginalName}), Family: ${params.formulationFamily}, Retail Product: ${params.retailName}, Application: ${params.primaryApplication}. Make the copy bold, industrial, confident, and professional.`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const content = JSON.parse(json.choices[0]?.message?.content || '{}');
        return {
          ...content,
          verificationNotice: 'AI SUGGESTION — REQUIRES HUMAN VERIFICATION BEFORE PUBLISHING',
        };
      }
    }
  } catch (err) {
    console.warn('AI enrichment fallback triggered', err);
  }

  return defaultResult;
}
