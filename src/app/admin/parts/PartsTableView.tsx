'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, CheckSquare, Square, ChevronUp, ChevronDown } from 'lucide-react';

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
}

interface Props {
  parts: Part[];
  currentSort: string;
  onSortChange: (sort: string) => void;
  onSelectionChange: (ids: string[]) => void;
}

function ScorePill({ score }: { score?: number | null }) {
  const s = score ?? 0;
  const color =
    s >= 80 ? 'bg-green-50 text-green-700' :
    s >= 50 ? 'bg-amber-50 text-amber-700' :
    'bg-red-50 text-red-700';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-[3px] font-mono text-[10px] font-bold ${color}`}>
      {s}%
    </span>
  );
}

function SortHeader({
  label,
  sortKey,
  currentSort,
  onSort,
}: {
  label: string;
  sortKey: string;
  currentSort: string;
  onSort: (k: string) => void;
}) {
  const isAsc = currentSort === `${sortKey}_asc`;
  const isDesc = currentSort === `${sortKey}_desc`;
  const isActive = isAsc || isDesc;
  return (
    <button
      type="button"
      onClick={() => onSort(isAsc ? `${sortKey}_desc` : `${sortKey}_asc`)}
      className={`flex items-center gap-1 text-left whitespace-nowrap transition-colors ${
        isActive ? 'text-[#FF6900]' : 'text-[#475569] hover:text-[#0F172A]'
      }`}
    >
      {label}
      {isAsc ? <ChevronUp className="w-3 h-3" /> : isDesc ? <ChevronDown className="w-3 h-3" /> : <span className="w-3 h-3" />}
    </button>
  );
}

export default function PartsTableView({ parts, currentSort, onSortChange, onSelectionChange }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleOne = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange(Array.from(next));
      return next;
    });
  }, [onSelectionChange]);

  const toggleAll = useCallback(() => {
    setSelected(prev => {
      const allIds = parts.map(p => p.id);
      const allSelected = allIds.every(id => prev.has(id));
      const next = allSelected ? new Set<string>() : new Set(allIds);
      onSelectionChange(Array.from(next));
      return next;
    });
  }, [parts, onSelectionChange]);

  async function deactivatePart(id: string) {
    if (!confirm('Deactivate this part? It will be hidden from the storefront.')) return;
    await fetch(`/api/admin/parts/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  const allSelected = parts.length > 0 && parts.every(p => selected.has(p.id));
  const someSelected = !allSelected && parts.some(p => selected.has(p.id));

  return (
    <div className="bg-white border border-[#E2E4E8] rounded-[6px] overflow-hidden shadow-tactile-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-3 w-10">
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-[#94A3B8] hover:text-[#FF6900] transition-colors"
                  title={allSelected ? 'Deselect all' : 'Select all on this page'}
                >
                  {allSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#FF6900]" />
                  ) : someSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#CBD5E1]" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3.5 px-4">
                <SortHeader label="Part Number" sortKey="part_number" currentSort={currentSort} onSort={onSortChange} />
              </th>
              <th className="py-3.5 px-4">
                <SortHeader label="Name" sortKey="name" currentSort={currentSort} onSort={onSortChange} />
              </th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Brand</th>
              <th className="py-3.5 px-4">
                <SortHeader label="Cost" sortKey="cost_price" currentSort={currentSort} onSort={onSortChange} />
              </th>
              <th className="py-3.5 px-4">
                <SortHeader label="Retail (ex. VAT)" sortKey="price" currentSort={currentSort} onSort={onSortChange} />
              </th>
              <th className="py-3.5 px-4">Stock</th>
              <th className="py-3.5 px-4">
                <SortHeader label="Quality" sortKey="quality" currentSort={currentSort} onSort={onSortChange} />
              </th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {parts.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center text-[#94A3B8]">
                  No parts match your filters. Try broadening your search.
                </td>
              </tr>
            ) : (
              parts.map(part => {
                const isSelected = selected.has(part.id);
                const cost = part.cost_price ? `£${Number(part.cost_price).toFixed(2)}` : '—';
                const retail = part.price ? `£${Number(part.price).toFixed(2)}` : 'POA';

                return (
                  <tr
                    key={part.id}
                    className={`transition-colors ${isSelected ? 'bg-orange-50/40' : 'hover:bg-[#F8FAFC]'}`}
                  >
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => toggleOne(part.id)}
                        className="text-[#94A3B8] hover:text-[#FF6900] transition-colors"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#FF6900]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#0F172A] text-[11px]">{part.part_number}</span>
                      {part.sku && (
                        <span className="block text-[10px] text-[#94A3B8] font-mono mt-0.5">{part.sku}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-[220px]">
                      <span className="font-medium text-[#1E293B] truncate block">{part.name}</span>
                      {part.needs_review && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold rounded-[2px] uppercase tracking-wide">
                          Needs Review
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#64748B]">
                      <span className="px-2 py-0.5 bg-[#F1F3F7] rounded-[3px] text-[10px] font-medium">
                        {part.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E4E8] rounded-[3px] text-[11px] font-semibold text-[#334155]">
                        {part.brand || part.manufacturer || 'Alkota'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#64748B] text-[11px]">{cost}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[11px]">
                      <span className={part.price ? 'text-[#0F172A]' : 'text-[#94A3B8] font-normal'}>
                        {retail}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[10px] font-bold ${
                          part.in_stock ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-[1px] ${part.in_stock ? 'bg-green-600' : 'bg-amber-500'}`} />
                        {part.in_stock ? 'In Stock' : part.availability_status === 'check_availability' ? 'Check' : 'Order Only'}
                      </span>
                      {!part.active && (
                        <span className="block mt-0.5 px-1.5 py-0.5 bg-[#F1F3F7] text-[#94A3B8] text-[9px] font-bold rounded-[2px] uppercase">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <ScorePill score={part.data_quality_score} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/parts/${part.id}/edit`}
                          className="p-1.5 rounded-[4px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] transition-colors"
                          title="Edit part"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => deactivatePart(part.id)}
                          className="p-1.5 rounded-[4px] text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Deactivate part"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
