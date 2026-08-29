'use client';

import { useState } from 'react';
import { Download, FileText, FileCheck, ShieldCheck, ArrowRight, Search } from 'lucide-react';
import { LobbyResource } from '@/lib/lobby';

interface Props {
  resources: LobbyResource[];
}

const TYPE_FILTERS = ['All Resources', 'Whitepaper', 'Specification', 'Compliance Guide'];

export default function TechnicalLibrary({ resources }: Props) {
  const [activeFilter, setActiveFilter] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resources.filter(res => {
    const matchesFilter = activeFilter === 'All Resources' ||
      (activeFilter === 'Whitepaper' && res.resource_type === 'whitepaper') ||
      (activeFilter === 'Specification' && res.resource_type === 'spec_sheet') ||
      (activeFilter === 'Compliance Guide' && res.resource_type === 'compliance_brief');

    const matchesSearch = !searchQuery.trim() ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 08 // Engineering Archive
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Technical Library & Downloads.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Downloadable CAD schematics, Schedule 80 metallurgy specifications, and Environment Agency wash bay compliance checklists.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {TYPE_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={'px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors border cursor-pointer ' + (
                  activeFilter === f
                    ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
                    : 'bg-white text-[#666] border-[#E5E5E0] hover:border-[#1A1A18]'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search downloads..."
              className="w-full bg-white border border-[#E5E5E0] text-xs px-3.5 py-2 pl-9 focus:outline-none focus:border-[#FF6900] font-normal"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#999]" />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(res => (
            <div
              key={res.id}
              className="bg-white border border-[#E5E5E0] p-6 flex flex-col justify-between hover:border-[#FF6900]/50 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#888] mb-3">
                  <span className="bg-[#FAFAF8] border border-[#E5E5E0] px-2 py-0.5 uppercase text-[#FF6900]">
                    {res.resource_type}
                  </span>
                  <span>{res.file_format} · {res.file_size_bytes ? (res.file_size_bytes / 1000000).toFixed(1) + ' MB' : 'PDF'}</span>
                </div>

                <h3 className="font-light text-lg sm:text-xl text-[#1A1A18] mb-2 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-[#666] leading-relaxed font-normal mb-6">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-between">
                <a
                  href={res.file_url}
                  download
                  className="inline-flex items-center gap-2 bg-[#1A1A18] hover:bg-[#FF6900] text-white px-4 py-2 text-xs uppercase tracking-widest transition-colors font-normal no-underline"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Document</span>
                </a>

                <span className="text-[11px] font-mono text-[#888]">
                  Verified PDF
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
