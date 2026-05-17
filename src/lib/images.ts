export function resolveMachineImage(
  image_url: string | null,
  model_code: string | null,
  category: string | null
): string {
  const modelKey = (model_code || '').toLowerCase().trim();
  
  const productImages: Record<string, string> = {
    '216ax4': '/assets/products/216ax4.png',
    '420ax4': '/assets/products/420ax4.png',
    '216x4': '/assets/products/216x4.png',
    '420x4': '/assets/products/420x4.png',
    '430xm4': '/assets/products/430xm4.png',
    '4405xd4': '/assets/products/4405xd4.png',
    '8405hnl': '/assets/products/8405hnl.png',
    '5355ens': '/assets/products/5355ens.png',
    '5355j': '/assets/products/5355j.png',
    '5355hnl': '/assets/products/8405hnl.png',
    '7407dnl': '/assets/products/8405hnl.png',
    '430xh': '/assets/products/430xm4.png',
    '420xh': '/assets/products/420x4.png',
    '330xh4': '/assets/products/216x4.png',
    '4405f': '/assets/products/4405xd4.png',
    '10307kk': '/assets/products/4405xd4.png',
    '111': '/assets/products/steam-oil.png',
    '911': '/assets/products/steam-oil.png',
    'vfs-1': '/assets/products/steam-oil.png',
  };

  // 1. Check if we have an explicit mapping for this model code
  if (productImages[modelKey]) {
    return productImages[modelKey];
  }

  // 2. If database has an image URL, verify and clean it
  if (image_url && image_url.trim() !== '') {
    const filename = image_url.split('/').pop()?.toLowerCase() || '';
    const fileKey = filename.replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
    if (productImages[fileKey]) {
      return productImages[fileKey];
    }
    return image_url;
  }

  // 3. Fallback based on category
  return category === 'hot-water'
    ? '/assets/products/420x4.png'
    : category === 'steam-cleaner' || category === 'steam'
    ? '/assets/products/steam-oil.png'
    : '/assets/products/4305xd4.png';
}
