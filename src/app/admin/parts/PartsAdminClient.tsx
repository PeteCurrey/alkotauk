'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import PartsTableView from './PartsTableView';
import PartsPagination from './PartsPagination';
import BulkActionBar from './BulkActionBar';

interface Part {
  id: string;
  part_number: string;
  sku?: string | null;
  name: string;
  category: string;
  brand?: string | null;
  manufacturer?: string | null;
  cost_price?: number | null;
  price?: number | null;
  in_stock: boolean;
  availability_status: string;
  needs_review?: boolean;
  data_quality_score?: number | null;
  active: boolean;
  updated_at?: string;
}

interface Props {
  parts: Part[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  currentSort: string;
  categories: { slug: string; name: string }[];
  brands: { slug: string; name: string }[];
}

export default function PartsAdminClient({
  parts,
  totalCount,
  currentPage,
  pageSize,
  currentSort,
  categories,
  brands,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [, startTransition] = useTransition();

  const handleSortChange = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(sp.toString());
      params.set('sort', sort);
      params.delete('page');
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [sp, pathname, router]
  );

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  const handleBulkComplete = useCallback(() => {
    setSelectedIds([]);
    router.refresh();
  }, [router]);

  return (
    <>
      <PartsTableView
        parts={parts}
        currentSort={currentSort}
        onSortChange={handleSortChange}
        onSelectionChange={handleSelectionChange}
      />

      <PartsPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
      />

      <BulkActionBar
        selectedIds={selectedIds}
        onClear={() => setSelectedIds([])}
        categories={categories}
        brands={brands}
        onActionComplete={handleBulkComplete}
      />
    </>
  );
}
