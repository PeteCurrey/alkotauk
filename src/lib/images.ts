export type ImageRole =
  | 'PRIMARY'
  | 'GALLERY'
  | 'DETAIL'
  | 'OPTION'
  | 'TECHNICAL'
  | 'OTHER_MANUFACTURER_MEDIA';

export type ImageVerificationStatus =
  | 'VERIFIED_EXACT_MODEL'
  | 'VERIFIED_SHARED_MANUFACTURER'
  | 'VERIFIED_SERIES'
  | 'REQUIRES_REVIEW'
  | 'NOT_AVAILABLE';

export interface ResolvedMachineImageDetails {
  url: string;
  source: 'LOCAL_VERIFIED_ASSET' | 'OFFICIAL_MANUFACTURER_CDN' | 'CATEGORY_FALLBACK';
  verificationStatus: ImageVerificationStatus;
  role: ImageRole;
  isExactModel: boolean;
  caption: string;
}

// Models with verified exact-model photography (asset specifically depicts this exact configuration)
const EXACT_MODEL_CODES = new Set<string>([
  '216ax4', '420ax4', '216x4', '420x4', '430xm4', '4405xd4', '3305xd4',
  '4301-ng/lp', '5357c', '5355jb', '5355j', '5355ens', '8405hnl',
  '2110', '216bd', '311bd', '420bd', '430bd', '530bd',
  '420s', '530s', '25500', '25750', '25755-gas-engine', '325csh',
  '219cse', '122', 'INDUSTRIAL-HEATERS', '8-vfs-1'
]);

export function resolveMachineImage(
  image_url: string | null,
  model_code: string | null,
  category: string | null
): string {
  return getMachineImageDetails(image_url, model_code, category).url;
}

export function getMachineImageDetails(
  image_url: string | null,
  model_code: string | null,
  category: string | null
): ResolvedMachineImageDetails {
  const rawKey = (model_code || '').toLowerCase().trim();
  const modelKey = rawKey.replace(/^alkota-?/, '');

  // Local verified photographic assets
  const productImages: Record<string, string> = {
    // AX4 Series
    '216ax4': '/assets/products/216ax4.png',
    '311ax4': '/assets/products/420ax4.png',
    '320ax4': '/assets/products/420ax4.png',
    '324ax4': '/assets/products/420ax4.png',
    '420ax4': '/assets/products/420ax4.png',

    // X4 Series
    '216x4': '/assets/products/216x4.png',
    '320x4': '/assets/products/420x4.png',
    '420x4': '/assets/products/420x4.png',
    '430xm4': '/assets/products/430xm4.png',
    '480x4': '/assets/products/480x4.png',
    '523x4': '/assets/products/420x4.png',

    // Gas-Fired X4 Portable
    '216x4pt': '/assets/products/gas-fired-x4.png',
    '311x4pt': '/assets/products/gas-fired-x4.png',
    '320x4pt': '/assets/products/gas-fired-x4.png',
    '324x4pt': '/assets/products/gas-fired-x4.png',

    // XD4 Direct Drive
    '3305xd4': '/assets/products/3305xd4.png',
    '3405xd4': '/assets/products/3405xd4.png',
    '4305xd4': '/assets/products/4305xd4.png',
    '4405xd4': '/assets/products/4405xd4.png',

    // Gas-Fired Stationary
    '4201': '/assets/products/4301-ng-lp.png',
    '4301': '/assets/products/4301-ng-lp.png',
    '4301-ng/lp': '/assets/products/4301-ng-lp.png',
    '4301-ng-lp': '/assets/products/4301-ng-lp.png',
    '5301': '/assets/products/4301-ng-lp.png',
    '8351': '/assets/products/4301-ng-lp.png',
    '10301': '/assets/products/4301-ng-lp.png',

    // DED Diesel Skids
    '5357c': '/assets/products/5357c.png',
    '5357kz': '/assets/products/5357c.png',
    '5357': '/assets/products/5357c.png',
    '5407': '/assets/products/5357c.png',
    '8307k': '/assets/products/ded-big-boy.png',
    '5357k': '/assets/products/ded-big-boy.png',
    '5507k': '/assets/products/ded-big-boy.png',
    '10307kka': '/assets/products/ded-big-boy.png',
    '10307kk': '/assets/products/ded-big-boy.png',

    // GED 115V Skids
    '5355jb': '/assets/products/ged-115v-skid.png',
    '5305eab': '/assets/products/ged-115v-skid.png',
    '8305h': '/assets/products/ged-115v-skid.png',

    // Industrial Series (5355J, 5355EAD, 5505J share the heavy Industrial Series chassis)
    '5355j': '/assets/products/5355j.png',
    '5355ead': '/assets/products/5355j.png',
    '5505j': '/assets/products/5355j.png',

    // EN / HN Narrow Frame
    '5355ens': '/assets/products/5355ens.png',
    '5355enl': '/assets/products/5355ens.png',
    '5355hns': '/assets/products/8405hnl.png',
    '5355hnl': '/assets/products/8405hnl.png',
    '8405hnl': '/assets/products/8405hnl.png',
    '7407dnl': '/assets/products/8405hnl.png',

    // Cold Water
    '2110': '/assets/products/2110.png',
    '216bd': '/assets/products/216bd2.png',
    '216bd2': '/assets/products/216bd2.png',
    '311bd': '/assets/products/311bd3.png',
    '311bd3': '/assets/products/311bd3.png',
    '420bd': '/assets/products/430bd.png',
    '430bd': '/assets/products/430bd.png',
    '530bd': '/assets/products/430bd.png',
    '420s': '/assets/products/420s.png',
    '430s': '/assets/products/430s.png',
    '520s': '/assets/products/520s.png',
    '530s': '/assets/products/530s.png',
    '25500': '/assets/products/25500.png',
    '25750': '/assets/products/25750.png',
    '25755': '/assets/products/25755.png',
    '25755-gas-engine': '/assets/products/25755.png',
    '325csh': '/assets/products/325csh.png',

    // All Electric Hot Water Series
    '108': 'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png',
    '4208': 'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png',
    '4308': 'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png',
    '5308': 'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png',

    // Oil-Fired Steam Cleaners (Dedicated oil burner equipment)
    '122': '/assets/products/steam-oil.png',
    '240': '/assets/products/steam-oil.png',
    '122x4': '/assets/products/steam-oil.png',
    '240en': '/assets/products/steam-oil.png',

    // Note: 181, 241, 301, 401 are LP/NG Gas Fired Steam Cleaners.
    // They are intentionally NOT mapped to steam-oil.png and use their authoritative
    // manufacturer CDN asset: Steam_Cleaners_Gas_Fired_Steam_Cleaner_301_Alkota-1024x1024.png

    // Note: 246EN and 126 are Dry Steam Generators.
    // They are intentionally NOT mapped to steam-oil.png and use their authoritative
    // manufacturer CDN asset: 246EN_Dry_Steam_Web.webp
  };

  // 1. Explicit local verified asset match
  if (productImages[modelKey]) {
    const isExact = EXACT_MODEL_CODES.has(modelKey);
    const isLocal = productImages[modelKey].startsWith('/');
    return {
      url: productImages[modelKey],
      source: isLocal ? 'LOCAL_VERIFIED_ASSET' : 'OFFICIAL_MANUFACTURER_CDN',
      verificationStatus: isExact ? 'VERIFIED_EXACT_MODEL' : 'VERIFIED_SERIES',
      role: 'PRIMARY',
      isExactModel: isExact,
      caption: isExact ? 'Exact Model Specification' : 'Manufacturer Series Photography',
    };
  }

  // 2. Official Manufacturer CDN URL provided by database/reconciliation
  if (image_url && image_url.trim() !== '') {
    const isExact = EXACT_MODEL_CODES.has(modelKey);
    return {
      url: image_url,
      source: 'OFFICIAL_MANUFACTURER_CDN',
      verificationStatus: isExact ? 'VERIFIED_EXACT_MODEL' : 'VERIFIED_SHARED_MANUFACTURER',
      role: 'PRIMARY',
      isExactModel: isExact,
      caption: isExact ? 'Exact Model Specification' : 'Official Manufacturer Equipment Photography',
    };
  }

  // 3. Category fallbacks (Last resort)
  const categoryFallbacks: Record<string, string> = {
    'hot-water': '/assets/products/420x4.png',
    'cold-water': '/assets/products/420s.png',
    'steam': '/assets/products/steam-oil.png',
    'trailer': '/assets/products/trailer-single.png',
    'parts-washer': '/assets/products/stationary-gas-fired.png',
    'parts-washers': '/assets/products/stationary-gas-fired.png',
    'water-heater': '/assets/products/4301-ng-lp.png',
    'space-heater': '/assets/products/steam-oil.png',
    'water-treatment': '/assets/products/steam-oil.png',
  };

  const fallbackUrl = (category && categoryFallbacks[category]) || '/assets/products/4405xd4.png';
  return {
    url: fallbackUrl,
    source: 'CATEGORY_FALLBACK',
    verificationStatus: 'REQUIRES_REVIEW',
    role: 'PRIMARY',
    isExactModel: false,
    caption: 'Alkota Category Representative Image',
  };
}
