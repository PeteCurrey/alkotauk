'use client';

import React from 'react';

interface SortSelectProps {
  value: string;
  categorySlug: string;
  brand?: string;
  available?: string;
  searchQuery?: string;
}

export default function SortSelect({ value, categorySlug, brand, available, searchQuery }: SortSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = new URLSearchParams();
    if (brand) p.set('brand', brand);
    if (available) p.set('available', available);
    if (searchQuery) p.set('q', searchQuery);
    const newSort = e.target.value;
    if (newSort && newSort !== 'default') p.set('sort', newSort);
    else p.delete('sort');
    const qs = p.toString();
    window.location.href = `/parts-attachments/${categorySlug}${qs ? `?${qs}` : ''}`;
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="bg-[#FAF9F5] border border-[#DCDAD4] text-alkota-black px-2.5 py-1 text-xs focus:outline-none focus:border-black font-normal"
    >
      <option value="default">Default Order</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="newest">Newest Additions</option>
    </select>
  );
}
