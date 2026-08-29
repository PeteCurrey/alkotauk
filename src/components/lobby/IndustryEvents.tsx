'use client';

import { Calendar, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface EventItem {
  id: string;
  dateBadge: { day: string; month: string };
  title: string;
  type: 'Exhibition' | 'Webinar' | 'On-Site Demo' | 'Conference';
  location: string;
  description: string;
  registerUrl: string;
}

const EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    dateBadge: { day: '18–20', month: 'MAY 2026' },
    title: 'Commercial Vehicle Show 2026 (CV Show)',
    type: 'Exhibition',
    location: 'NEC Birmingham · Hall 5',
    description: 'UK logistics and commercial fleet exhibition. Visit Alkota engineering specialists to review mobile trailer wash rigs and Schedule 80 hot-water plant.',
    registerUrl: '/contact'
  },
  {
    id: 'ev-2',
    dateBadge: { day: '04', month: 'JUN 2026' },
    title: 'Designing Environment Agency Compliant Commercial Wash Bays',
    type: 'Webinar',
    location: 'Live Interactive Webinar (10:00 BST)',
    description: 'Expert walkthrough on concrete pad falls, BS EN 858 Class 1 oil interceptor sizing, and Trade Effluent Consent applications with water authorities.',
    registerUrl: '/contact'
  },
  {
    id: 'ev-3',
    dateBadge: { day: '17', month: 'JUN 2026' },
    title: 'Alkota UK Heavy Plant Cleaning Demonstration Day',
    type: 'On-Site Demo',
    location: 'Midlands Equipment Testing Ground',
    description: 'Live field trials on tracked excavators, concrete batching equipment, and bitumen tankers using high-flow hot water and dry steam vapour.',
    registerUrl: '/contact'
  },
  {
    id: 'ev-4',
    dateBadge: { day: '14–15', month: 'JUL 2026' },
    title: 'LAMMA Agricultural Machinery Engineering Forum',
    type: 'Conference',
    location: 'NEC Birmingham · Technical Arena',
    description: 'Addressing biosecurity, mud extraction from combine harvesters, and high-efficiency washdown rigs for UK farming estates.',
    registerUrl: '/contact'
  }
];

export default function IndustryEvents() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 05 // Calendar
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Industry Events.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            National exhibitions, technical webinars, and on-site field demonstration days with Alkota applications engineers.
          </p>
        </div>

        {/* Date-Led Event Strip */}
        <div className="divide-y divide-[#E5E5E0] border-t border-b border-[#E5E5E0] bg-white">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#FAFAF8] transition-colors"
            >
              {/* Date Box + Title */}
              <div className="flex items-start gap-6">
                <div className="bg-[#1A1A18] text-white p-3 sm:p-4 text-center min-w-[90px] sm:min-w-[100px] shrink-0 border-l-2 border-[#FF6900]">
                  <span className="block font-light text-2xl sm:text-3xl leading-none">
                    {event.dateBadge.day}
                  </span>
                  <span className="block font-mono text-[10px] tracking-widest text-[#FF6900] uppercase mt-1">
                    {event.dateBadge.month}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-[#FF6900] uppercase font-medium">
                      {event.type}
                    </span>
                    <span className="text-[#888]">•</span>
                    <span className="text-[#666] flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="font-light text-xl sm:text-2xl text-[#1A1A18] leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666] leading-relaxed max-w-2xl font-normal">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 pt-2 lg:pt-0">
                <Link
                  href={event.registerUrl}
                  className="inline-flex items-center gap-2 border border-[#1A1A18] hover:bg-[#FF6900] hover:border-[#FF6900] hover:text-white text-[#1A1A18] px-5 py-2.5 text-xs uppercase tracking-widest transition-all font-normal no-underline"
                >
                  <span>Register Interest</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
