import { NextRequest, NextResponse } from 'next/server';
import { getLobbyArticles, getLobbyResources } from '@/lib/lobby';
import { getProducts } from '@/lib/products';

// Rate limiting map: IP -> timestamp array
const ipRequests = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequests.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  recent.push(now);
  ipRequests.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many queries. Please wait a moment before asking another question.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: 'Question exceeds maximum character length (500).' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.ASK_THE_LOBBY_MODEL || 'gpt-4o-mini';

    // Fetch database content for grounding
    const [articles, products, resources] = await Promise.all([
      getLobbyArticles(),
      getProducts().catch(() => []),
      getLobbyResources().catch(() => []),
    ]);

    const lowerQ = question.toLowerCase();

    // Helper: generate grounded knowledge response if OpenAI is unavailable or quota exhausted
    function generateGroundedFallback(q: string) {
      if (q.includes('drain') || q.includes('effluent') || q.includes('sewer') || q.includes('regulat') || q.includes('environment agency') || q.includes('interceptor') || q.includes('oil')) {
        return {
          answer: `**UK Wash Bay Environmental Compliance & Drainage Guidance**

Under the **Environmental Permitting (England and Wales) Regulations 2016** and published **Environment Agency Pollution Prevention Guidelines (GPP 13 / PPG3)**, all wash water originating from vehicle and plant cleaning is legally classified as **trade effluent**. It must **never** be permitted to enter clean surface water drains, watercourses, or soakaways.

### Key Regulatory Considerations:
- **Mandatory Foul Sewer Connection**: Connecting a commercial wash pad to the public sewer network requires prior written **Trade Effluent Consent** from your regional water undertaker (Water Industry Act 1991, s.118).
- **BS EN 858 Class 1 Oil Interceptor**: Standard specification requires a coalescing filter separator maintaining hydrocarbon discharge concentrations $\le 5\text{ mg/L}$, fitted with automatic closure devices (ACD) and visual/acoustic optical alarms.
- **Surface Water Diversion**: Uncovered wash bays should incorporate a rainfall diverter valve to avoid overloading the foul sewer during non-operational periods.
- **Closed-Loop Alternative**: For sites without foul sewer access, an Alkota closed-loop water treatment and recycling system eliminates off-site discharge liabilities entirely.`,
          sources: [
            { name: 'Environment Agency Pollution Prevention (GPP 13)', url: 'https://www.gov.uk/guidance/pollution-prevention-for-businesses' },
            { name: 'BS EN 858-1:2002 Separator Systems for Light Liquids', url: 'https://knowledge.bsigroup.com' },
            { name: 'Water UK Trade Effluent Advisory', url: 'https://www.water.org.uk' },
            { name: 'UK Wash Bay Environmental Compliance Guide', url: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators' }
          ],
          relatedArticles: [
            { title: 'UK Wash Bay Environmental Compliance: Drainage & Oil Separators', href: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators' },
            { title: 'The Metallurgy of Heavy Heating Coils (Schedule 80)', href: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80' }
          ]
        };
      }

      if (q.includes('coil') || q.includes('schedule 80') || q.includes('metallurgy') || q.includes('steel') || q.includes('pipe') || q.includes('thermal shock')) {
        return {
          answer: `**Schedule 80 ASTM A53 Seamless Steel Coil Metallurgy**

Industrial hot-water pressure washers subject heating coils to violent thermo-mechanical cycling — transitioning from 10°C to 140°C in seconds while containing hydrostatic pressure spikes exceeding 300 bar.

### Mechanical & Thermal Criteria:
- **Wall Thickness & Hoop Stress**: Standard Schedule 40 tubing has a 2.77mm wall thickness. Alkota specifies **ASTM A53 Schedule 80 seamless steel** with a **3.73mm wall thickness** — representing a **34.6% increase in steel cross-section**.
- **Barlow's Formula Resilience**: Design bursting pressure is directly proportional to wall thickness ( = 2St / D$). Schedule 80 provides a vital corrosion and descaling allowance against hard water mineralization.
- **Cold-Wound Continuous Winding**: Formed on CNC mandrel tooling without intermediate welds, eliminating grain boundary vulnerabilities and localized shear stress.
- **Warranty**: Alkota North Dakota engineered coils include an industry-benchmark **7-Year Heating Coil Warranty** as standard.`,
          sources: [
            { name: 'ASTM A53 / A53M Pipe Steel Specification', url: 'https://www.astm.org' },
            { name: 'Alkota Engineering Metallurgy Whitepaper', url: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80' },
            { name: '7-Year Heating Coil Warranty Standards', url: '/support/warranty' }
          ],
          relatedArticles: [
            { title: 'The Metallurgy of Heavy Heating Coils (Schedule 80)', href: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80' },
            { title: 'Vapour Steam vs High-Pressure Hot Water Mechanics', href: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown' }
          ]
        };
      }

      if (q.includes('steam') || q.includes('dry steam') || q.includes('vapour') || q.includes('hot water vs') || q.includes('food') || q.includes('haccp') || q.includes('sanitis')) {
        return {
          answer: `**Thermodynamic Comparison: 140°C Dry Vapour Steam vs High-Pressure Hot Water**

Selecting between dry steam and hot-water pressure washing depends fundamentally on whether thermal breakdown or kinetic blast force is required for the contamination type.

### Thermodynamic Breakdown:
- **Dry Saturated Steam (140°C - 165°C at 10-35 bar)**: Heat transfer occurs via the **latent heat of condensation (2,260 kJ/kg)**. Low water volume (2–6 L/min) prevents flooding and overspray, making it ideal for food conveyor hygiene, Listeria biofilm destruction, and electrical panel degreasing.
- **High-Pressure Hot Water (80°C - 95°C at 150-350 bar)**: Heat is delivered as sensible heat combined with extreme **kinetic impingement** (>180 m/s nozzle velocity) to displace heavy mud, bitumen, and tracked plant soil.
- **Chemical Efficiency**: High thermal output accelerates chemical kinetics (Arrhenius equation), reducing required detergent concentrations by up to 60%.`,
          sources: [
            { name: 'Food Standards Agency (FSA) HACCP Sanitisation Principles', url: 'https://www.food.gov.uk' },
            { name: 'Thermodynamics of Industrial Cleaning Vapour', url: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown' },
            { name: 'Alkota Dry Steam Equipment Catalogue', url: '/machines/steam' }
          ],
          relatedArticles: [
            { title: 'Vapour Steam vs High-Pressure Hot Water: Thermal Breakdown Mechanics', href: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown' },
            { title: 'Aqueous vs Solvent Parts Washing: VOC Compliance Costs', href: '/lobby/economics-tco/aqueous-vs-solvent-parts-washing-voc-compliance-costs' }
          ]
        };
      }

      if (q.includes('parts washer') || q.includes('solvent') || q.includes('aqueous') || q.includes('voc') || q.includes('dsear') || q.includes('degreas')) {
        return {
          answer: `**Aqueous vs Solvent Parts Washing: VOC Compliance & Operating Costs**

Traditional solvent sink basins carry significant recurring costs from hazardous waste disposal, fire insurance surcharges, and HSE VOC exposure monitoring under COSHH and DSEAR.

### Mechanical & Safety Advantages of Automated Aqueous Washers:
- **Automated Rotary Cycle**: Heated alkaline detergent (65°C–80°C) is delivered through multi-angle spray manifolds while components rotate on an internal turntable, reducing manual mechanic labor from 45 minutes to a 15-minute automated cycle.
- **Integrated Disc Oil Skimmers**: As the bath cools, non-emulsified tramp oils float to the surface and are mechanically skimmed into an external collector, extending bath fluid life for months.
- **VOC Elimination**: Water-based chemistry produces zero flammable hydrocarbons or VOC vapors, achieving full compliance with HSE workplace safety mandates.`,
          sources: [
            { name: 'HSE Dangerous Substances & Explosive Atmospheres (DSEAR)', url: 'https://www.hse.gov.uk' },
            { name: 'Aqueous Degreasing TCO & Health Analysis', url: '/lobby/economics-tco/aqueous-vs-solvent-parts-washing-voc-compliance-costs' },
            { name: 'Alkota Aqueous Front-Loading Parts Washers', url: '/parts-washers' }
          ],
          relatedArticles: [
            { title: 'Aqueous vs Solvent Parts Washing: VOC Compliance & Operating Costs', href: '/lobby/economics-tco/aqueous-vs-solvent-parts-washing-voc-compliance-costs' },
            { title: 'UK Wash Bay Environmental Compliance: Drainage & Oil Separators', href: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators' }
          ]
        };
      }

      // Default comprehensive response
      return {
        answer: `**Industrial Cleaning Engineering & Specification Guidance**

Industrial pressure washing, thermal fluid systems, and wash bay facilities require strict alignment between operational duty cycles, water volume, heating capacity, and environmental regulations.

### Core Engineering Principles:
- **Thermal Efficiency**: High-pressure hot water (80°C–95°C) breaks down heavy hydrocarbon grease through thermal melting and kinetic blast force.
- **Heating Coil Integrity**: ASTM A53 Schedule 80 seamless steel pipe provides 34.6% more metal mass than light commercial coils, resisting thermal shock under continuous multi-shift operation.
- **Environmental Compliance**: Discharges must never enter surface water drains. Trade effluent consent and BS EN 858 Class 1 oil interceptors are legally required for foul sewer drainage.
- **Machine Selection**: For site-specific selection, use the interactive Machine Matcher or consult an Alkota applications engineer.`,
        sources: [
          { name: 'Environment Agency Wash Bay Guidelines (GPP 13)', url: 'https://www.gov.uk/guidance/pollution-prevention-for-businesses' },
          { name: 'BS EN 858-1:2002 Separator Systems', url: 'https://knowledge.bsigroup.com' },
          { name: 'The Lobby Engineering Archive', url: '/lobby' }
        ],
        relatedArticles: [
          { title: 'The Metallurgy of Heavy Heating Coils (Schedule 80)', href: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80' },
          { title: 'UK Wash Bay Environmental Compliance: Drainage & Oil Separators', href: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators' }
        ]
      };
    }

    if (apiKey) {
      try {
        const articlesSummary = articles.map(a => ({
          title: a.title,
          slug: '/lobby/' + a.category_slug + '/' + a.slug,
          excerpt: a.excerpt,
          tags: a.tags,
          category: a.category_slug,
        }));

        const productsSummary = products.slice(0, 15).map((p: any) => ({
          name: p.name,
          slug: '/machines/' + (p.category || 'hot-water') + '/' + p.slug,
          specs: p.specs || p.specifications,
          desc: p.description,
        }));

        const systemPrompt = `You are "Ask The Lobby", an expert technical and regulatory research assistant for Alkota UK's industrial cleaning intelligence platform.

Your mission is to provide authoritative, highly practical, technically accurate, and objective answers to professionals who specify, operate, and maintain industrial high-pressure cleaning systems, wash bays, parts washers, and steam generators.

KNOWLEDGE BASE CONTEXT:
Articles Available in The Lobby:
${JSON.stringify(articlesSummary, null, 2)}

Key Alkota Machines & Fleet:
${JSON.stringify(productsSummary, null, 2)}

Official Regulatory Standards Grounding:
- UK Environment Agency (EA) / Pollution Prevention Guidelines (PPG3 / GPP 13): Vehicle wash water is legally "trade effluent". Discharging to surface water drains (clean rainwater) or soakaways is illegal under the Environmental Permitting Regulations 2016. Must discharge to foul sewer with Trade Effluent Consent from regional sewerage undertaker, or utilize a closed-loop water recovery recycling system.
- British Standard BS EN 858-1:2002 / BS EN 858-2: Class 1 coalescing separators achieve <= 5 mg/L hydrocarbon discharge; Class 2 gravity separators achieve <= 100 mg/L. Interceptors must feature Automatic Closure Devices (ACD) and optical level alarms.
- Metallurgy & Engineering: ASTM A53 Schedule 80 cold-rolled seamless carbon steel pipe (wall thickness 3.73mm vs 2.77mm for domestic schedule 40) provides 34.6% more steel, hoop stress resilience under Barlow's formula, and continuous cold-wound helix construction without internal welds. Backed by Alkota's 7-Year Coil Warranty.
- Thermodynamics: 140°C dry vapour steam delivers latent heat of condensation (2,260 kJ/kg) with minimal water volume (2-6 L/min) for food HACCP sanitisation and precision machine degreasing. High-pressure hot water (80-95°C at 150-350 bar) delivers sensible heat combined with kinetic impingement force for heavy mud, bitumen, and fleet chassis washdown.

RESPONSE RULES:
1. Professional Tone: Authoritative, concise, technical, objective, and helpful. Never sound like a generic sales brochure.
2. Regulatory Caution: When answering legal/regulatory questions, use careful wording like "Under current published Environment Agency guidance and the Environmental Permitting Regulations..." and note that site-specific trade effluent consents should be verified with the regional water authority or competent environmental engineer.
3. Structure:
   - **Direct Answer**: 1-2 clear, informative paragraphs explaining the core principle or solution.
   - **Key Technical / Regulatory Considerations**: 3-4 bullet points with specific technical metrics, standards, or formulas.
   - **Recommended Next Steps**: Practical actionable guidance.
4. Citations & Links:
   - When referencing a Lobby article or machine, provide the markdown link with its exact slug from the context.
   - Mention official authorities by name (e.g., Environment Agency, Water UK, British Standards Institution BS EN 858, HSE, DEFRA).`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: question },
            ],
            temperature: 0.2,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const answer = data.choices?.[0]?.message?.content;
          if (answer) {
            const matchedArticles = articles.filter(a => {
              const matchTag = a.tags?.some(t => lowerQ.includes(t.toLowerCase()));
              const matchTitle = a.title.toLowerCase().split(' ').some(w => w.length > 4 && lowerQ.includes(w));
              return matchTag || matchTitle;
            }).slice(0, 3);

            const relevantSources = [
              { name: 'UK Environment Agency Guidelines', url: 'https://www.gov.uk/guidance/pollution-prevention-for-businesses' },
              { name: 'BS EN 858-1:2002 Separator Systems', url: 'https://knowledge.bsigroup.com' },
              { name: 'Water UK Trade Effluent Advisory', url: 'https://www.water.org.uk' },
              { name: 'Alkota Technical Engineering Standards', url: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80' },
            ];

            return NextResponse.json({
              answer,
              sources: relevantSources,
              relatedArticles: matchedArticles.length > 0
                ? matchedArticles.map(a => ({ title: a.title, href: '/lobby/' + a.category_slug + '/' + a.slug }))
                : articles.slice(0, 2).map(a => ({ title: a.title, href: '/lobby/' + a.category_slug + '/' + a.slug })),
            });
          }
        }
      } catch (e) {
        console.error('OpenAI fetch error, falling back to grounded knowledge response:', e);
      }
    }

    // Return authoritative grounded response
    const fallback = generateGroundedFallback(lowerQ);
    return NextResponse.json(fallback);
  } catch (error) {
    console.error('Ask The Lobby route error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your query.' },
      { status: 500 }
    );
  }
}
