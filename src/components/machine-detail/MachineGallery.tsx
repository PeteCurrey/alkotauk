'use client';

/**
 * MachineGallery — lightweight gallery viewer for machine detail page.
 * Client component (needs state for lightbox). Deduplicates gallery vs primary.
 * Only renders if there are genuinely distinct images beyond the primary.
 * Keyboard accessible, mobile-friendly, no layout shift.
 */

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface Props {
  primaryImage: string;
  galleryImages: string[];
  modelCode: string;
  altBase: string;
}

export default function MachineGallery({ primaryImage, galleryImages, modelCode, altBase }: Props) {
  // Build deduplicated list: primary first, then any gallery images that differ
  const distinctGallery = galleryImages.filter(
    (img) => img && img.trim() !== '' && img !== primaryImage
  );

  // If no extra images, don't render the gallery UI at all
  if (distinctGallery.length === 0) return null;

  const allImages = [primaryImage, ...distinctGallery];

  return <GalleryInner allImages={allImages} modelCode={modelCode} altBase={altBase} />;
}

function GalleryInner({
  allImages,
  modelCode,
  altBase,
}: {
  allImages: string[];
  modelCode: string;
  altBase: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allImages.length : null));
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null));
  }, [allImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <>
      {/* ── Thumbnail strip ────────────────────────────────────────────── */}
      <div className="mt-4 border border-alkota-iron bg-alkota-bg p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange">
            // MANUFACTURER PHOTOGRAPHY
          </span>
          <span className="font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest">
            {allImages.length} Views
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => openLightbox(idx)}
              aria-label={`View ${altBase} — image ${idx + 1} of ${allImages.length}`}
              className="relative shrink-0 w-20 h-16 border border-alkota-iron bg-white overflow-hidden hover:border-alkota-orange transition-colors group focus-visible:outline-2 focus-visible:outline-alkota-orange"
            >
              <img
                src={img}
                alt={`${altBase} view ${idx + 1}`}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-alkota-black/0 group-hover:bg-alkota-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-4 h-4 text-alkota-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-alkota-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${altBase} — image ${lightboxIndex + 1} of ${allImages.length}`}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors p-2 focus-visible:outline-2 focus-visible:outline-alkota-orange"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-3 bg-alkota-black/40 hover:bg-alkota-black/80 focus-visible:outline-2 focus-visible:outline-alkota-orange"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[lightboxIndex]}
              alt={`${altBase} — view ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-ibm-plex-mono text-[10px] text-white/50 uppercase tracking-widest bg-alkota-black/60 px-3 py-1">
              {modelCode} · {lightboxIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Next */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-3 bg-alkota-black/40 hover:bg-alkota-black/80 focus-visible:outline-2 focus-visible:outline-alkota-orange"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
