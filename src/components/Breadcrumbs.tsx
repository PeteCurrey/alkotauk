"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-8 overflow-x-auto no-scrollbar py-2">
      <ol className="flex items-center space-x-2 text-sm font-mono uppercase tracking-widest">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="text-alkota-steel hover:text-alkota-orange transition-colors flex items-center gap-2"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-alkota-iron" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-alkota-steel hover:text-alkota-orange transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-alkota-orange font-bold whitespace-nowrap">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://alkota.co.uk"
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://alkota.co.uk${item.href}` : undefined
              }))
            ]
          })
        }}
      />
    </nav>
  );
}
