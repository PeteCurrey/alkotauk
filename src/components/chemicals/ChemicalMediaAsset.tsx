'use client';

import React from 'react';
import { Camera, Beaker, ShieldCheck, Droplets, Layers, Zap, Eye } from 'lucide-react';

export type ChemicalMediaRole =
  | 'CATEGORY HERO'
  | 'CONTAMINATION MACRO'
  | 'SURFACE DETAIL'
  | 'APPLICATION ENVIRONMENT'
  | 'PROCESS'
  | 'RESULT'
  | 'PRODUCT CONTAINER'
  | 'TECHNICAL DETAIL'
  | 'CROSS-SYSTEM'
  | 'WATER / RECOVERY';

interface ChemicalMediaAssetProps {
  role: ChemicalMediaRole;
  assetUrl?: string | null;
  altText: string;
  className?: string;
  aspectRatio?: '16/9' | '16/10' | '4/3' | '1/1' | '21/9' | '4/5';
  priority?: 'P0' | 'P1' | 'P2';
  technicalCaption?: string;
  fallbackSubject?: string;
  showOverlayGradient?: boolean;
}

const ROLE_ICONS: Record<ChemicalMediaRole, any> = {
  'CATEGORY HERO': Layers,
  'CONTAMINATION MACRO': Droplets,
  'SURFACE DETAIL': ShieldCheck,
  'APPLICATION ENVIRONMENT': Zap,
  'PROCESS': Beaker,
  'RESULT': ShieldCheck,
  'PRODUCT CONTAINER': Beaker,
  'TECHNICAL DETAIL': Eye,
  'CROSS-SYSTEM': Zap,
  'WATER / RECOVERY': Droplets,
};

export default function ChemicalMediaAsset({
  role,
  assetUrl,
  altText,
  className = '',
  aspectRatio = '16/9',
  priority = 'P1',
  technicalCaption,
  fallbackSubject = 'Engineered Chemical Formulation Interaction',
  showOverlayGradient = true,
}: ChemicalMediaAssetProps) {
  const Icon = ROLE_ICONS[role] || Beaker;

  // Aspect ratio classes
  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '16/10': 'aspect-[16/10]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    '4/5': 'aspect-[4/5]',
  }[aspectRatio] || 'aspect-[16/9]';

  const hasRealAsset = !!assetUrl && assetUrl.trim().length > 0;

  return (
    <div
      className={`relative overflow-hidden bg-[#111111] border border-[#262626] group ${aspectClass} ${className}`}
    >
      {hasRealAsset ? (
        <>
          <img
            src={assetUrl}
            alt={altText}
            className="w-full h-full object-cover object-center filter grayscale-[0.25] group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
          {showOverlayGradient && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          )}
        </>
      ) : (
        /* ─── SOPHISTICATED PRODUCTION-READY PLACEHOLDER ─────────────────── */
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-[#121212] bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Top Metadata Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
                // {role}
              </span>
            </div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#666] px-2 py-0.5 border border-[#2A2A2A] bg-black/60">
              {priority} ASSET // {aspectRatio}
            </span>
          </div>

          {/* Central Technical Monogram */}
          <div className="my-auto text-center space-y-3 z-10 max-w-sm mx-auto">
            <div className="inline-flex p-3 bg-black/80 border border-[#2E2E2E] text-alkota-orange">
              <Icon className="h-6 w-6 opacity-80" />
            </div>
            <div>
              <span className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA] font-medium">
                {fallbackSubject}
              </span>
              <span className="block text-[11px] text-[#666] font-normal leading-tight mt-1">
                {altText}
              </span>
            </div>
          </div>

          {/* Bottom Technical Caption / Grid Lines */}
          <div className="flex items-center justify-between border-t border-[#222] pt-3 z-10">
            <span className="font-ibm-plex-mono text-[8px] text-[#555] uppercase tracking-widest">
              Alkota Chemistry Media System
            </span>
            <span className="font-ibm-plex-mono text-[8px] text-[#777] uppercase">
              {technicalCaption || 'Production Studio Specification'}
            </span>
          </div>

          {/* Subtle Industrial Overlay Accents */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
