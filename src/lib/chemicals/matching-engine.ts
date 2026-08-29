import { ChemicalProduct, ChemicalMatchRequest, ChemicalMatchResult } from '@/lib/types/chemical';
import { VERIFIED_CHEMICAL_PRODUCTS } from '@/lib/chemicals/seed-data';

export interface DiagnosticOption {
  id: string;
  label: string;
  sublabel?: string;
  category?: string;
}

export const CONTAMINATION_OPTIONS: DiagnosticOption[] = [
  { id: 'road_film', label: 'Electrostatic Road Film & Traffic Dirt', sublabel: 'HGVs, delivery fleets, public transport, light commercial vehicles' },
  { id: 'heavy_grease', label: 'Heavy Hydrocarbon Grease & Crude Oil', sublabel: 'Fifth-wheels, engine bays, gearboxes, plant hydraulics, pits' },
  { id: 'agricultural_soil', label: 'Heavy Agricultural Soil & Organic Clay', sublabel: 'Tractors, combines, slurry tanks, field implements, livestock bays' },
  { id: 'baked_carbon', label: 'Baked-on Carbon & Diesel Soot', sublabel: 'Exhaust manifolds, cooking hoods, paper mill screens, boiler parts' },
  { id: 'limescale_minerals', label: 'Limescale & Water Mineral Hardness', sublabel: 'Heating coils, heat exchangers, internal boiler tubes' },
  { id: 'parts_machining_swarf', label: 'Machining Coolants, Sludge & Swarf', sublabel: 'Automated parts washers, reconditioned engine components, tooling' },
  { id: 'food_fats_proteins', label: 'Food Oils, Animal Tallow & Proteins', sublabel: 'Meat processing equipment, bakery ovens, conveyor belts, abattoirs' },
  { id: 'tar_bitumen', label: 'Bitumen, Asphalt & Adhesive Tack', sublabel: 'Road surfacing plant, paver hoppers, chassis asphalt splatter' },
  { id: 'mortar_efflorescence', label: 'Mortar Smear & Carbonate Efflorescence', sublabel: 'Brickwork handover, warehouse concrete slabs, block paving' },
];

export const SURFACE_OPTIONS: DiagnosticOption[] = [
  { id: 'painted_vehicle', label: 'Vehicle Paintwork & Commercial Clear Coat', sublabel: 'High-gloss truck cabs, liveried vans, buses, cars' },
  { id: 'polished_aluminium', label: 'Mirror Polished / Bare Aluminium', sublabel: 'Fuel tanks, polished wheels, architectural extrusions (Sensitive)' },
  { id: 'standard_aluminium', label: 'Cast or Standard Mill Aluminium', sublabel: 'Engine heads, gearbox casings, structural ladders' },
  { id: 'mild_steel_machinery', label: 'Mild Steel & Cast Iron Heavy Machinery', sublabel: 'Excavator chassis, plant frames, industrial floor slabs' },
  { id: 'stainless_steel', label: '304 / 316 Stainless Steel', sublabel: 'Road tankers, food processing production lines, exhaust tips' },
  { id: 'concrete_masonry', label: 'Hardened Concrete Floors & Brick Paving', sublabel: 'Workshop floors, wash pads, brick facades, pavers' },
  { id: 'vinyl_liveries', label: 'Vinyl Vehicle Liveries & Reflective Chevrons', sublabel: 'Fleet vinyl wraps, branded curtainsiders, emergency chevrons' },
];

export const EQUIPMENT_OPTIONS: DiagnosticOption[] = [
  { id: 'hot_water', label: 'Hot Water Pressure Washer (60°C – 95°C)', sublabel: 'Schedule 80 thermal activation for rapid grease emulsification' },
  { id: 'cold_water', label: 'Cold Water Pressure Washer', sublabel: 'High-volume mechanical rinse (15–30 L/min)' },
  { id: 'steam_cleaner', label: 'Dry Steam Cleaner (140°C Vapour)', sublabel: 'Low-moisture thermal sanitisation & detail degreasing' },
  { id: 'parts_washer', label: 'Automatic Rotary / Soak Parts Washer', sublabel: 'Enclosed heated aqueous wash cabinet' },
  { id: 'foam_cannon', label: 'Low-Pressure Pre-Spray Foam Cannon', sublabel: 'Dense cling time before pressure rinse' },
];

export function runChemicalMatch(request: ChemicalMatchRequest, products: ChemicalProduct[] = VERIFIED_CHEMICAL_PRODUCTS): ChemicalMatchResult[] {
  const results: ChemicalMatchResult[] = [];

  for (const product of products) {
    if (!product.active || product.uk_status === 'draft' || product.uk_status === 'archived') {
      continue;
    }

    let score = 0;
    const reasons: string[] = [];
    let surfaceSuitability: 'optimal' | 'suitable_with_caution' | 'not_recommended' = 'optimal';
    let surfaceWarning: string | undefined = undefined;

    // 1. Contamination Match
    if (request.contamination === 'road_film') {
      if (product.slug === 'power-blast-tr407' || product.slug === 'touchless-tr470') {
        score += 45;
        reasons.push('Engineered specifically for electrostatic road-film neutralisation without brushing');
      } else if (product.slug === 'super-luster-tr600' || product.slug === 'farm-soap-tr440') {
        score += 30;
        reasons.push('Effective on heavy road grime and transport soil');
      }
    } else if (request.contamination === 'heavy_grease') {
      if (product.slug === 'grease-cutter-de703') {
        score += 50;
        reasons.push('High-potency alkaline builder formulated for fifth-wheel and hydrocarbon grease breakdown');
      } else if (product.slug === 'citrus-blast-de721') {
        score += 35;
        reasons.push('Natural d-limonene solvent dissolves grease safely on sensitive surfaces');
      } else if (product.slug === 'farm-soap-tr440') {
        score += 30;
        reasons.push('Alkaline builders emulsify greasy agricultural equipment residues');
      }
    } else if (request.contamination === 'agricultural_soil') {
      if (product.slug === 'farm-soap-tr440') {
        score += 50;
        reasons.push('Alkota\'s flagship Ag formula; strips caked clay and slurry while restoring oxidised paint');
      } else if (product.slug === 'raptor-tr428') {
        score += 40;
        reasons.push('Natural citrus surfactants strip loam and equipment slime with clean free-rinsing finish');
      }
    } else if (request.contamination === 'baked_carbon') {
      if (product.slug === 'grease-cutter-de703' || product.slug === 'super-luster-tr600') {
        score += 45;
        reasons.push('High hydroxide content penetrates and loosens carbonaceous deposits');
      }
    } else if (request.contamination === 'limescale_minerals') {
      if (product.slug === 'scale-stop-coil-protector') {
        score += 55;
        reasons.push('Proprietary liquid chelating agent specifically designed to suspend calcium/magnesium minerals in heating coils');
      } else if (product.slug === 'crete-clean') {
        score += 35;
        reasons.push('Inhibited acid dissolves external mineral efflorescence on masonry slabs');
      }
    } else if (request.contamination === 'parts_machining_swarf') {
      if (product.slug === 'apw-pro-clean') {
        score += 55;
        reasons.push('Zero-foaming aqueous detergent with 60-day flash rust inhibitor for automatic parts washers');
      } else if (product.slug === 'citrus-blast-de721') {
        score += 30;
        reasons.push('Safe degreaser for benchtop ultrasonic immersion baths');
      }
    } else if (request.contamination === 'food_fats_proteins') {
      if (product.slug === 'citrus-blast-de721' || product.slug === 'raptor-tr428') {
        score += 40;
        reasons.push('Biodegradable free-rinsing surfactants lift food fats (potable water rinse required)');
      }
    } else if (request.contamination === 'tar_bitumen') {
      if (product.slug === 'grease-cutter-de703' || product.slug === 'citrus-blast-de721') {
        score += 45;
        reasons.push('Concentrated solvent power liquefies asphalt tack and tar splatter');
      }
    } else if (request.contamination === 'mortar_efflorescence') {
      if (product.slug === 'crete-clean') {
        score += 55;
        reasons.push('Inhibited acid reacts with and dissolves carbonate mortar smears and efflorescence');
      }
    }

    // 2. Surface Compatibility & Safety Rules (CRITICAL SAFETY GUARDRAILS)
    if (request.surface === 'polished_aluminium') {
      if (product.slug === 'grease-cutter-de703' || product.slug === 'super-luster-tr600' || product.slug === 'crete-clean') {
        // STRICT EXCLUSION: High Caustic or Strong Acid will etch polished aluminium
        surfaceSuitability = 'not_recommended';
        surfaceWarning = '⚠️ CAUTION: High alkaline/acidic chemistry will permanently cloud or etch polished aluminium. Do not use.';
        score -= 100;
      } else if (product.slug === 'power-blast-tr407' || product.slug === 'citrus-blast-de721' || product.slug === 'touchless-tr470' || product.slug === 'apw-pro-clean') {
        score += 30;
        surfaceSuitability = 'optimal';
        reasons.push('100% verified safe for polished bare aluminium, alloy wheels, and chrome extrusions');
      } else if (product.slug === 'farm-soap-tr440') {
        surfaceSuitability = 'suitable_with_caution';
        surfaceWarning = 'Safe when diluted as directed (1:50+). Do not apply concentrated or allow to dry on unlacquered aluminium.';
        score += 10;
      }
    } else if (request.surface === 'painted_vehicle' || request.surface === 'vinyl_liveries') {
      if (product.slug === 'power-blast-tr407' || product.slug === 'touchless-tr470') {
        score += 30;
        reasons.push('Safe on delicate clear coats, vinyl graphics, wraps, and rubber seals');
      } else if (product.slug === 'crete-clean') {
        surfaceSuitability = 'not_recommended';
        surfaceWarning = '⚠️ Acidic formulation is not suitable for automotive paintwork or vinyl graphics.';
        score -= 100;
      }
    } else if (request.surface === 'concrete_masonry') {
      if (product.slug === 'crete-clean' || product.slug === 'grease-cutter-de703') {
        score += 25;
        reasons.push('Formulated for deep penetration into porous concrete and brick substrates');
      }
    } else if (request.surface === 'stainless_steel') {
      if (product.slug === 'super-luster-tr600') {
        score += 35;
        reasons.push('Contains surface optical brighteners engineered for streak-free stainless road tankers');
      } else if (product.slug === 'power-blast-tr407' || product.slug === 'grease-cutter-de703') {
        score += 20;
      }
    }

    // 3. Equipment Synergy
    if (request.equipmentType === 'hot_water') {
      if (product.dilution_hot) {
        score += 15;
        reasons.push('Thermally activated for peak performance in 60°C–95°C hot water streams');
      }
    } else if (request.equipmentType === 'parts_washer') {
      if (product.slug === 'apw-pro-clean') {
        score += 40;
        reasons.push('Specifically designed for automatic turntable high-pressure aqueous spray cabinets');
      } else {
        score -= 30;
      }
    }

    // 4. Water Recovery & Environmental Constraints
    let waterRecoveryFit = true;
    if (request.waterRecoverySystem) {
      if (product.water_recovery_compatible) {
        score += 15;
        reasons.push('Fully compatible with oil-water separator interceptors and water reclamation systems');
      } else {
        score -= 20;
        waterRecoveryFit = false;
        reasons.push('Note: Requires dedicated effluent handling before standard water recycling filters');
      }
    }

    // 5. Food Process Area Constraints
    if (request.foodProcessArea) {
      if (product.food_process_status === 'rinse_required') {
        score += 10;
        reasons.push('Approved for food equipment cleaning when followed by a thorough potable water rinse');
      } else if (product.food_process_status === 'non_food' && product.slug !== 'scale-stop-coil-protector') {
        score -= 15;
      }
    }

    // Only include products that have positive score and not excluded
    if (score > 15 && surfaceSuitability !== 'not_recommended') {
      results.push({
        score,
        product,
        fitReason: reasons.slice(0, 3).join(' • '),
        surfaceSuitability,
        surfaceWarning,
        recommendedDilution: request.equipmentType === 'hot_water' ? (product.dilution_hot || '1:60 to 1:100') : (product.dilution_cold || '1:30 to 1:60'),
        keySafetyNotes: product.hazard_classification ? `${product.signal_word !== 'NONE' ? `[${product.signal_word}] ` : ''}${product.hazard_classification}. Refer to current SDS before handling.` : 'Non-hazardous formulation. Wear basic eye protection during pressure washing.',
        waterRecoveryFit
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
