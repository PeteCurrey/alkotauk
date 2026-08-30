import { supabaseAdmin } from '@/lib/supabase/server';
import type { Product } from '@/lib/admin/types';
import ProductListClient from './ProductListClient';

export const revalidate = 0;

export default async function ProductsPage() {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  const items = (products ?? []) as Product[];

  return <ProductListClient initialProducts={items} />;
}

