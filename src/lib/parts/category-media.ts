import { 
  Gauge, 
  Flame, 
  Layers, 
  Activity, 
  Wrench, 
  Target, 
  RotateCcw, 
  ShieldAlert, 
  Filter, 
  Zap, 
  CheckCircle2, 
  Package, 
  Link2, 
  Cpu, 
  Droplets, 
  Sparkles,
  type LucideIcon 
} from 'lucide-react';

export interface CategoryMediaConfig {
  image: string;
  alt: string;
  objectFit: 'cover' | 'contain';
  objectPosition: string;
  departmentCode: string;
  focalAccent?: string;
}

/**
 * Authoritative, authentic Alkota UK media assets strictly sourced from
 * existing repository files in public/assets/.
 *
 * No AI-generated images, no generic stock placeholders.
 */
export const CATEGORY_AUTHENTIC_MEDIA: Record<string, CategoryMediaConfig> = {
  pumps: {
    image: '/assets/products/industrial-pump.png',
    alt: 'Alkota industrial triplex ceramic plunger pump assembly',
    objectFit: 'contain',
    objectPosition: 'right 60%',
    departmentCode: 'DEPT 01 · FLUID DYNAMICS',
  },
  burners: {
    image: '/assets/products/steam-oil.png',
    alt: 'Alkota oil-fired combustion burner head and steam heating module',
    objectFit: 'contain',
    objectPosition: 'right 45%',
    departmentCode: 'DEPT 02 · COMBUSTION & THERMAL',
  },
  coils: {
    image: '/assets/products/stationary-gas-fired.png',
    alt: 'Schedule 80 ASTM A53 continuous hydro-insulated heating coil',
    objectFit: 'contain',
    objectPosition: 'right 45%',
    departmentCode: 'DEPT 03 · HEAT EXCHANGERS',
  },
  hoses: {
    image: '/assets/products/high-pressure-hose.png',
    alt: 'High-pressure steel wire braided hose with swaged crimps',
    objectFit: 'contain',
    objectPosition: 'right 50%',
    departmentCode: 'DEPT 04 · FLUID RETICULATION',
  },
  'trigger-guns': {
    image: '/assets/products/trigger-gun.png',
    alt: 'Alkota ergonomic easy-pull industrial spray handle and insulated wand',
    objectFit: 'contain',
    objectPosition: 'right 45%',
    departmentCode: 'DEPT 05 · OPERATOR CONTROLS',
  },
  'lances-nozzles': {
    image: '/assets/products/spray-nozzles.png',
    alt: 'Precision calibrated colour-coded spray nozzles and rotating turbo tips',
    objectFit: 'contain',
    objectPosition: 'right 55%',
    departmentCode: 'DEPT 06 · IMPACT TOOLING',
  },
  'surface-cleaners': {
    image: '/assets/products/whirl-away-surface-cleaner.png',
    alt: 'Industrial rotary flat surface cleaner dome and twin-nozzle rotor',
    objectFit: 'contain',
    objectPosition: 'right 50%',
    departmentCode: 'DEPT 07 · ROTARY TOOLING',
  },
  'valves-unloaders': {
    image: '/assets/parts/parts-hero-bg.jpg',
    alt: 'Trapped-pressure unloader valve, brass manifold and pressure instrumentation',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    departmentCode: 'DEPT 08 · HYDRAULIC REGULATION',
  },
  filters: {
    image: '/assets/products/jetter-series.png',
    alt: 'Industrial fresh water inlet filtration and suction strainers',
    objectFit: 'contain',
    objectPosition: 'right 50%',
    departmentCode: 'DEPT 09 · FILTRATION & WATER TREATMENT',
  },
  'electrical-switches': {
    image: '/assets/cold-water-control-hero.jpg',
    alt: 'Heavy-duty rotary power switches, contactors and electrical control box',
    objectFit: 'cover',
    objectPosition: 'center 35%',
    departmentCode: 'DEPT 10 · ELECTRICAL & PANELS',
  },
  'seals-o-rings': {
    image: '/assets/products/industrial-pump.png',
    alt: 'High-pressure packing seals, Viton O-rings and ceramic plunger kits',
    objectFit: 'contain',
    objectPosition: 'right 60%',
    departmentCode: 'DEPT 11 · SEALS & TOLERANCES',
  },
  'service-kits': {
    image: '/assets/parts/parts-hero-workshop.jpg',
    alt: 'Alkota technician service workshop bench, scheduled maintenance kits and tooling',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    departmentCode: 'DEPT 12 · SCHEDULED MAINTENANCE',
  },
  'fittings-couplers': {
    image: '/assets/products/spray-nozzles.png',
    alt: 'Precision quick-release stainless steel couplers, plugs and live swivels',
    objectFit: 'contain',
    objectPosition: 'right 55%',
    departmentCode: 'DEPT 13 · MECHANICAL COUPLINGS',
  },
  'engines-motors': {
    image: '/assets/engineered-continuous-duty.jpg',
    alt: 'Continuous-duty TEFC electric motor and industrial belt drive system',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    departmentCode: 'DEPT 14 · POWER & DRIVELINES',
  },
  attachments: {
    image: '/assets/products/whirl-away-surface-cleaner.png',
    alt: 'Specialist surface cleaning attachments, foam lances and undercarriage wash bars',
    objectFit: 'contain',
    objectPosition: 'right 50%',
    departmentCode: 'DEPT 15 · SPECIALIST ATTACHMENTS',
  },
  chemicals: {
    image: '/assets/wash-plant/hero-plant-spray.jpg',
    alt: 'Industrial chemical wash bay and high-potency vehicle washdown',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    departmentCode: 'DEPT 16 · APPLIED CHEMISTRY',
  },
};

/**
 * Authoritative category icon resolver
 */
export function getCategoryIcon(iconName?: string | null, slug?: string): LucideIcon {
  const normalized = (iconName || slug || '').toLowerCase();
  
  if (normalized.includes('pump') || normalized.includes('gauge')) return Gauge;
  if (normalized.includes('burn') || normalized.includes('flame')) return Flame;
  if (normalized.includes('coil') || normalized.includes('layer')) return Layers;
  if (normalized.includes('hose') || normalized.includes('activity')) return Activity;
  if (normalized.includes('gun') || normalized.includes('lance') || normalized.includes('wand')) return Wrench;
  if (normalized.includes('nozzle') || normalized.includes('target') || normalized.includes('jet')) return Target;
  if (normalized.includes('surface') || normalized.includes('cleaner') || normalized.includes('rotate')) return RotateCcw;
  if (normalized.includes('valve') || normalized.includes('unloader') || normalized.includes('shield')) return ShieldAlert;
  if (normalized.includes('filter') || normalized.includes('strainer')) return Filter;
  if (normalized.includes('electric') || normalized.includes('switch') || normalized.includes('zap')) return Zap;
  if (normalized.includes('seal') || normalized.includes('ring') || normalized.includes('check')) return CheckCircle2;
  if (normalized.includes('kit') || normalized.includes('service') || normalized.includes('package')) return Package;
  if (normalized.includes('fit') || normalized.includes('coupl') || normalized.includes('link')) return Link2;
  if (normalized.includes('engine') || normalized.includes('motor') || normalized.includes('cpu')) return Cpu;
  if (normalized.includes('chem') || normalized.includes('droplet')) return Droplets;
  if (normalized.includes('attach') || normalized.includes('sparkle')) return Sparkles;
  
  return Wrench;
}

/**
 * Authoritative Media Resolution Hierarchy:
 * 1. Explicitly configured category hero image (e.g. from database CMS)
 * 2. Approved repository category/product media (CATEGORY_AUTHENTIC_MEDIA)
 * 3. Fallback (null — clean minimal card, no broken or fake images)
 */
export function resolveCategoryMedia(category: {
  slug: string;
  name?: string;
  hero_image_url?: string | null;
}): CategoryMediaConfig | null {
  // Tier 1: Explicit DB configuration
  if (category.hero_image_url && category.hero_image_url.trim() !== '') {
    return {
      image: category.hero_image_url,
      alt: category.name ? `${category.name} - Alkota UK` : 'Alkota equipment component',
      objectFit: 'cover',
      objectPosition: 'center',
      departmentCode: 'OEM SPECIFICATION',
    };
  }

  // Tier 2: Authoritative approved repository media mapping
  const approved = CATEGORY_AUTHENTIC_MEDIA[category.slug];
  if (approved) {
    return approved;
  }

  // Tier 3: Return null for clean degradation
  return null;
}
