'use client';

import { useState } from 'react';
import MachineCard from '@/components/MachineCard';
import MachineCatalogueFilter from '@/components/MachineCatalogueFilter';
import { Product } from '@/lib/products';

interface MachineCatalogueGridProps {
  initialMachines: Product[];
}

export default function MachineCatalogueGrid({ initialMachines }: MachineCatalogueGridProps) {
  const [displayedMachines, setDisplayedMachines] = useState<Product[]>(initialMachines);

  return (
    <div>
      <MachineCatalogueFilter
        allMachines={initialMachines}
        onFiltered={setDisplayedMachines}
      />

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E0E0DC]">
        <p className="font-mono text-xs uppercase tracking-wider text-[#666]">
          Showing <span className="font-bold text-alkota-black">{displayedMachines.length}</span> of {initialMachines.length} Machines
        </p>
        <p className="font-mono text-xs text-[#888] uppercase tracking-wider hidden sm:block">
          Alkota Heavy Industrial Fleet
        </p>
      </div>

      {displayedMachines.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E0E0DC] p-8">
          <p className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
            No matching machines found
          </p>
          <p className="font-mono text-xs text-[#888] uppercase tracking-widest">
            Try broadening your search query or resetting filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedMachines.map((machine: any, idx: number) => (
            <MachineCard key={machine.id || machine.slug} machine={machine} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
