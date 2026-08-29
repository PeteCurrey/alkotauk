'use client';

import React, { useState } from 'react';
import { PartAssembly, DiagramCallout } from '@/lib/types/parts';
import { usePartsRequest } from './PartsRequestListContext';
import {
  Wrench,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  CheckCircle2,
  Download,
  Plus,
  ArrowRight,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface InteractiveDiagramViewerProps {
  assembly: PartAssembly;
  machineModelCode: string;
}

export default function InteractiveDiagramViewer({
  assembly,
  machineModelCode,
}: InteractiveDiagramViewerProps) {
  const [selectedCallout, setSelectedCallout] = useState<DiagramCallout | null>(
    assembly.callouts[0] || null
  );
  const [hoveredCallout, setHoveredCallout] = useState<DiagramCallout | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const { addItem } = usePartsRequest();

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.0, Math.max(1.0, prev + delta)));
  };

  const handleAddCalloutToRequest = (callout: DiagramCallout) => {
    addItem({
      part_number: callout.part_number,
      name: callout.part_name,
      quantity: 1,
      machine_context: `${machineModelCode} (${assembly.name})`,
      price_each: callout.price || null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Assembly Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
              // INTERACTIVE EXPLODED SCHEMATIC // MODEL: {machineModelCode}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl uppercase font-light text-alkota-black tracking-tight mt-1">
            {assembly.name}
          </h3>
        </div>

        {assembly.diagram_pdf_url && (
          <a
            href={assembly.diagram_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#D5D5D0] bg-white text-alkota-black hover:border-alkota-orange px-4 py-2 text-xs font-ibm-plex-mono uppercase tracking-wider transition-colors shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-alkota-orange" />
            <span>Download High-Res PDF Schematic</span>
          </a>
        )}
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ─── LEFT: INTERACTIVE SCHEMATIC CANVAS (8 cols) ───────────────── */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative bg-[#FAFAF8] border border-[#E0E0DC] overflow-hidden min-h-[420px] flex items-center justify-center select-none shadow-inner">
            {/* Zoom Controls Bar */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-xs border border-[#DDD] p-1 shadow-xs">
              <button
                type="button"
                onClick={() => handleZoom(0.25)}
                className="p-1.5 text-[#666] hover:text-black transition-colors cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <span className="font-ibm-plex-mono text-[10px] px-1.5 text-[#777]">
                {(zoomLevel * 100).toFixed(0)}%
              </span>
              <button
                type="button"
                onClick={() => handleZoom(-0.25)}
                className="p-1.5 text-[#666] hover:text-black transition-colors cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-[#666] hover:text-black transition-colors cursor-pointer border-l border-[#EEE] ml-1"
                title="Reset zoom"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Inner Zoomable Container */}
            <div
              className="relative w-full aspect-[4/3] max-w-2xl mx-auto transition-transform duration-300 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Schematic Background (Engineering Line-Art Representation) */}
              <div className="absolute inset-0 bg-[#F4F4F0] border border-[#E5E5E0] flex items-center justify-center p-8 bg-[radial-gradient(#CCC_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="text-center space-y-2 opacity-30 select-none pointer-events-none">
                  <Wrench className="h-16 w-16 text-[#888] mx-auto" />
                  <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#555] block">
                    Alkota OEM Engineering Schematic
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#777] block">
                    Assembly Code: {assembly.slug}
                  </span>
                </div>
              </div>

              {/* Callout Hotspot Pins */}
              {assembly.callouts.map((callout) => {
                const isSelected = selectedCallout?.callout_number === callout.callout_number;
                const isHovered = hoveredCallout?.callout_number === callout.callout_number;

                return (
                  <div
                    key={callout.id}
                    onClick={() => setSelectedCallout(callout)}
                    onMouseEnter={() => setHoveredCallout(callout)}
                    onMouseLeave={() => setHoveredCallout(null)}
                    style={{
                      left: `${callout.x_percent}%`,
                      top: `${callout.y_percent}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-200 group`}
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center font-ibm-plex-mono text-[11px] font-bold shadow-md transition-all ${
                        isSelected
                          ? 'bg-alkota-orange text-white scale-125 ring-4 ring-alkota-orange/30'
                          : isHovered
                          ? 'bg-alkota-black text-white scale-110'
                          : 'bg-white text-alkota-black border-2 border-alkota-black hover:border-alkota-orange'
                      }`}
                    >
                      {callout.callout_number}
                    </div>

                    {/* Hover Tooltip Preview */}
                    {isHovered && !isSelected && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-alkota-black text-white text-[10px] font-ibm-plex-mono py-1 px-2.5 whitespace-nowrap shadow-lg z-30 pointer-events-none">
                        Item {callout.callout_number}: {callout.part_name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-ibm-plex-mono text-[#777] px-1">
            <span>Click any numbered callout pin to view component specification.</span>
            <span>{assembly.callouts.length} Verified Components Mapped</span>
          </div>
        </div>

        {/* ─── RIGHT: SELECTED COMPONENT DETAIL CARD (4 cols) ─────────────── */}
        <div className="lg:col-span-4 bg-white border border-[#E0E0DC] p-6 shadow-sm space-y-6">
          {selectedCallout ? (
            <>
              <div className="pb-4 border-b border-[#EBEBE8] flex items-center justify-between">
                <span className="font-ibm-plex-mono text-xs uppercase bg-alkota-orange text-white px-2.5 py-1 font-bold">
                  Callout Item #{selectedCallout.callout_number}
                </span>
                <span className="font-ibm-plex-mono text-xs text-[#777]">
                  Qty: {selectedCallout.quantity_used}
                </span>
              </div>

              <div className="space-y-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold block">
                  OEM Part Number: {selectedCallout.part_number}
                </span>
                <h4 className="text-xl uppercase font-light text-alkota-black tracking-tight leading-snug">
                  {selectedCallout.part_name}
                </h4>

                {selectedCallout.price && (
                  <div className="font-ibm-plex-mono text-xl text-alkota-black font-bold pt-1">
                    £{selectedCallout.price.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-[#777]">excl. VAT</span>
                  </div>
                )}

                <p className="text-xs text-[#666] leading-relaxed font-normal">
                  {selectedCallout.notes ||
                    `Genuine Alkota OEM replacement component engineered specifically for ${assembly.name} on model ${machineModelCode}.`}
                </p>

                {selectedCallout.superseded_by && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-ibm-plex-mono space-y-1">
                    <span className="font-bold block uppercase">Superseded Part Notice</span>
                    <span>Replaced by current OEM PN: {selectedCallout.superseded_by}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EBEBE8] space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleAddCalloutToRequest(selectedCallout)}
                  className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors font-normal shadow-xs cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Parts Request List</span>
                </button>

                <Link
                  href={`/parts/${selectedCallout.part_number.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="w-full flex items-center justify-center gap-1.5 border border-[#D5D5D0] hover:border-alkota-orange text-alkota-black py-2.5 text-[11px] font-ibm-plex-mono uppercase tracking-wider transition-colors"
                >
                  <span>Full Component Page</span>
                  <ArrowRight className="h-3 w-3 text-alkota-orange" />
                </Link>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs font-ibm-plex-mono text-[#888] uppercase">
              Select a callout number on the diagram to inspect component details.
            </div>
          )}
        </div>
      </div>

      {/* ─── ACCESSIBLE NON-VISUAL LIST TABLE ALTERNATIVE ─────────────────── */}
      <div className="pt-8 border-t border-[#E8E8E4] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block">
              // ACCESSIBLE TABULAR BREAKDOWN
            </span>
            <h4 className="text-lg uppercase font-light text-alkota-black tracking-tight">
              Assembly Component Parts List
            </h4>
          </div>
          <span className="text-xs font-ibm-plex-mono text-[#777]">
            {assembly.callouts.length} Total Callout Positions
          </span>
        </div>

        <div className="border border-[#E0E0DC] overflow-x-auto bg-white">
          <table className="w-full text-left text-xs min-w-[680px]">
            <thead>
              <tr className="bg-[#F8F7F4] border-b border-[#E0E0DC] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
                <th className="px-5 py-3 w-16">Item #</th>
                <th className="px-5 py-3">Part Number</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3 w-20">Qty</th>
                <th className="px-5 py-3 w-32">Est. Price</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBE8]">
              {assembly.callouts.map((callout) => {
                const isSelected = selectedCallout?.callout_number === callout.callout_number;

                return (
                  <tr
                    key={callout.id}
                    onClick={() => setSelectedCallout(callout)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-orange-50/60 font-medium' : 'hover:bg-[#F9F9F7]'
                    }`}
                  >
                    <td className="px-5 py-3.5 font-ibm-plex-mono text-alkota-orange font-bold">
                      #{callout.callout_number}
                    </td>
                    <td className="px-5 py-3.5 font-ibm-plex-mono font-bold text-alkota-black">
                      {callout.part_number}
                    </td>
                    <td className="px-5 py-3.5 text-alkota-black font-normal">
                      {callout.part_name}
                      {callout.notes && (
                        <span className="block text-[10px] text-[#777] font-ibm-plex-mono mt-0.5">
                          {callout.notes}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-ibm-plex-mono text-[#666]">
                      {callout.quantity_used}
                    </td>
                    <td className="px-5 py-3.5 font-ibm-plex-mono text-alkota-black">
                      {callout.price ? `£${callout.price.toFixed(2)}` : 'Enquire'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCalloutToRequest(callout);
                        }}
                        className="inline-flex items-center gap-1 bg-alkota-black text-white hover:bg-alkota-orange px-3 py-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
