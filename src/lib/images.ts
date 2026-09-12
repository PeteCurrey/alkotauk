export function resolveMachineImage(
  image_url: string | null,
  model_code: string | null,
  category: string | null
): string {
  const modelKey = (model_code || '').toLowerCase().trim().replace(/^alkota-?/, '');
  
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

    // GED 115V / 12V Skids
    '5355jb': '/assets/products/ged-115v-skid.png',
    '5305eab': '/assets/products/ged-115v-skid.png',
    '8305h': '/assets/products/ged-115v-skid.png',
    '5355j': '/assets/products/5355j.png',
    '5355ead': '/assets/products/ged-12v-skid.png',
    '5505j': '/assets/products/ged-12v-skid.png',

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
    '216cse': '/assets/products/216ax4.png',
    '320cse': '/assets/products/216ax4.png',
    '845s': '/assets/products/ged-12v-skid.png',
    'jetter': '/assets/products/jetter-series.png',

    // Steam Cleaners
    '111': '/assets/products/steam-oil.png',
    '122': '/assets/products/steam-oil.png',
    '126': '/assets/products/steam-oil.png',
    '181': '/assets/products/steam-oil.png',
    '241': '/assets/products/steam-oil.png',
    '246en': '/assets/products/steam-oil.png',
    '301': '/assets/products/steam-oil.png',
    '401': '/assets/products/steam-oil.png',

    // Trailers & Water Treatment
    'trailer': '/assets/products/trailer-single.png',
    'vfs-1': '/assets/products/steam-oil.png',
    '911': '/assets/products/steam-oil.png',

    // Legacy codes
    '430xh': '/assets/products/430xm4.png',
    '420xh': '/assets/products/420x4.png',
    '330xh4': '/assets/products/216x4.png',
    '4405f': '/assets/products/4405xd4.png'
  };

  // 1. Explicit local asset match
  if (productImages[modelKey]) {
    return productImages[modelKey];
  }

  // 2. If database / source provides an image URL
  if (image_url && image_url.trim() !== '') {
    // If it points to an asset that exists locally by filename
    const filename = image_url.split('/').pop()?.toLowerCase() || '';
    const fileKey = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    if (productImages[fileKey]) {
      return productImages[fileKey];
    }
    return image_url;
  }

  // 3. Sensible category fallbacks
  if (category === 'hot-water') return '/assets/products/420x4.png';
  if (category === 'cold-water') return '/assets/products/420s.png';
  if (category === 'steam') return '/assets/products/steam-oil.png';
  if (category === 'trailer') return '/assets/products/trailer-single.png';
  if (category === 'parts-washer' || category === 'parts-washers') return '/assets/products/stationary-gas-fired.png';
  if (category === 'water-heater') return '/assets/products/4301-ng-lp.png';
  if (category === 'space-heater') return '/assets/products/steam-oil.png';
  if (category === 'water-treatment') return '/assets/products/steam-oil.png';

  return '/assets/products/4405xd4.png';
}
