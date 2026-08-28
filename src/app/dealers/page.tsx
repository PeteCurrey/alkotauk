'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DealerCard from '@/components/dealers/DealerCard';
import DealerInteractiveMap from '@/components/dealers/DealerInteractiveMap';
import { Dealer, getDealers } from '@/lib/dealers';
import { geocodePostcode, calculateHaversineDistance, extractPostcodeArea } from '@/lib/dealers/geo';
import { Search, MapPin, Navigation as LocateIcon, ShieldCheck, Wrench, Flame, Droplets, Filter, RotateCcw, ArrowRight, Loader2 } from 'lucide-react';

function DealerDirectoryInner() {
  const searchParams = useSearchParams();
  const initialPostcode = searchParams.get('postcode') || '';
  const productContext = searchParams.get('product') || '';
  const categoryContext = searchParams.get('category') || 'all';

  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialPostcode);
  const [selectedService, setSelectedService] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(categoryContext);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [searchedPostcode, setSearchedPostcode] = useState(initialPostcode);

  // Load initial dealers
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/dealers');
        if (res.ok) {
          const data = await res.json();
          setDealers(data.dealers || []);
          if (data.dealers?.length > 0) {
            setSelectedDealer(data.dealers[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching dealers:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter and distance sorting logic
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchedPostcode(searchQuery);

    const clean = searchQuery.trim().toUpperCase();
    const coords = geocodePostcode(clean);
    const prefix = extractPostcodeArea(clean);

    if (coords) {
      const sorted = [...dealers].map((d) => ({
        ...d,
        distance_miles: calculateHaversineDistance(
          coords.latitude,
          coords.longitude,
          d.latitude,
          d.longitude
        ),
      }));

      // Sort: Authoritative territory matches first, then nearest distance
      sorted.sort((a, b) => {
        const aTerritory = prefix ? a.territories?.some((t) => t.postcode_prefix === prefix) : false;
        const bTerritory = prefix ? b.territories?.some((t) => t.postcode_prefix === prefix) : false;

        if (aTerritory && !bTerritory) return -1;
        if (!aTerritory && bTerritory) return 1;

        return (a.distance_miles || 9999) - (b.distance_miles || 9999);
      });

      setDealers(sorted);
      if (sorted.length > 0) {
        setSelectedDealer(sorted[0]);
      }
    }
  };

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const sorted = [...dealers].map((d) => ({
            ...d,
            distance_miles: calculateHaversineDistance(
              latitude,
              longitude,
              d.latitude,
              d.longitude
            ),
          }));
          sorted.sort((a, b) => (a.distance_miles || 9999) - (b.distance_miles || 9999));
          setDealers(sorted);
          setSearchQuery('Current Location');
          setSearchedPostcode('Current Location');
          if (sorted.length > 0) setSelectedDealer(sorted[0]);
        },
        () => {
          alert('Location permission denied. Please enter your UK postcode manually.');
        }
      );
    }
  };

  // Filter list by selected service & product category
  const filteredDealers = dealers.filter((dealer) => {
    if (selectedService !== 'all') {
      const hasService = dealer.services?.some((s) => s.service_key === selectedService);
      if (!hasService) return false;
    }
    if (selectedCategory !== 'all') {
      const hasCategory = dealer.product_categories?.includes(selectedCategory);
      if (!hasCategory) return false;
    }
    return true;
  });

  return (
    <div className="pt-32 pb-20">
      {/* Header Banner */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-12 border-b border-[#D8D8D6] pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-alkota-orange" />
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
            AUTHORISED UK DEALER & SERVICE NETWORK
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-barlow-condensed text-6xl sm:text-8xl font-black uppercase italic tracking-tight text-alkota-black leading-[0.85]">
              FIND A LOCAL <br />
              <span className="text-alkota-orange">ALKOTA SPECIALIST.</span>
            </h1>
            <p className="mt-4 font-inter text-base sm:text-lg text-[#555] max-w-2xl leading-relaxed">
              Every Alkota dealer operates mobile service vans, genuine factory spares, and on-site demonstration facilities. Enter your postcode to locate your authorised regional sales and support hub.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
            <Link
              href="/dealers/become-a-dealer"
              className="inline-flex items-center gap-2 border border-alkota-black bg-white text-alkota-black px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline"
            >
              <span>Apply for Dealership</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Context Banner (if arrived from a specific machine page) */}
        {productContext && (
          <div className="mt-8 p-4 bg-[#F8F8F7] border border-alkota-orange flex items-center justify-between gap-4 font-ibm-plex-mono text-xs">
            <span className="text-[#555]">
              Searching for authorised support for:{' '}
              <strong className="text-alkota-black uppercase">{productContext}</strong>
            </span>
            <Link
              href="/dealers"
              className="text-alkota-orange font-bold hover:underline"
            >
              Clear Machine Filter
            </Link>
          </div>
        )}
      </section>

      {/* Search & Filter Controls */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-10">
        <div className="bg-white border border-[#D5D5D3] p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Postcode Input */}
            <div className="md:col-span-6 relative">
              <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase tracking-wider text-[#777] mb-1.5">
                ENTER POSTCODE OR TOWN
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. S42 5UY, M17 1JT, Leeds, Glasgow..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 pl-11 font-ibm-plex-mono text-sm text-alkota-black placeholder:text-[#999] focus:border-alkota-orange focus:outline-none"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
              </div>
            </div>

            {/* Service Filter */}
            <div className="md:col-span-3">
              <label className="block font-ibm-plex-mono text-[9px] font-bold uppercase tracking-wider text-[#777] mb-1.5">
                REQUIRED SERVICE
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#F8F8F7] border border-[#D5D5D3] px-4 py-3.5 font-ibm-plex-mono text-xs text-alkota-black focus:border-alkota-orange focus:outline-none"
              >
                <option value="all">All Services</option>
                <option value="machine-sales">Machine Sales & Demos</option>
                <option value="service-maintenance">Service & Maintenance</option>
                <option value="emergency-breakdown">Emergency Breakdown</option>
                <option value="parts-accessories">Genuine Parts Stock</option>
                <option value="trailer-systems">Trailer & Van Packs</option>
                <option value="water-recovery">Water Recovery & Bay</option>
              </select>
            </div>

            {/* Search Actions */}
            <div className="md:col-span-3 flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 bg-alkota-black text-white py-3.5 px-6 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors cursor-pointer text-center"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleUseLocation}
                className="p-3.5 bg-[#F0F0EE] border border-[#D5D5D3] text-alkota-black hover:border-alkota-orange hover:text-alkota-orange transition-colors cursor-pointer"
                title="Use my current location"
                aria-label="Use current location"
              >
                <LocateIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Results Layout: Side-by-Side Map & Result Cards */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Result Cards List */}
          <div className="lg:col-span-6 space-y-4 max-h-[700px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAEAEA]">
              <span className="font-ibm-plex-mono text-xs font-bold uppercase text-alkota-black">
                {filteredDealers.length} AUTHORISED DEALERS FOUND
              </span>
              {searchedPostcode && (
                <span className="font-ibm-plex-mono text-[10px] text-alkota-orange">
                  Near "{searchedPostcode}"
                </span>
              )}
            </div>

            {loading ? (
              <div className="p-12 text-center text-[#888] font-ibm-plex-mono text-xs">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-alkota-orange" />
                Searching authorised dealer network...
              </div>
            ) : filteredDealers.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#D5D5D3]">
                <p className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">
                  No Specific Dealer in This Filter
                </p>
                <p className="font-inter text-xs text-[#666] mb-6">
                  Our National Engineering Hub covers all UK regions directly.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-alkota-orange text-white px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                >
                  Contact National Support Desk
                </Link>
              </div>
            ) : (
              filteredDealers.map((dealer) => (
                <DealerCard
                  key={dealer.id}
                  dealer={dealer}
                  isSelected={selectedDealer?.id === dealer.id}
                  onSelect={(d) => setSelectedDealer(d)}
                />
              ))
            )}
          </div>

          {/* Right Column: Interactive Map View */}
          <div className="lg:col-span-6 sticky top-32">
            <DealerInteractiveMap
              dealers={filteredDealers}
              selectedDealer={selectedDealer}
              onSelectDealer={(d) => setSelectedDealer(d)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FindDealerPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F7] text-alkota-black flex flex-col justify-between">
      <Navigation />
      <Suspense
        fallback={
          <div className="min-h-screen pt-40 text-center font-ibm-plex-mono text-xs text-[#888]">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-alkota-orange mb-4" />
            Loading Alkota Dealer Locator...
          </div>
        }
      >
        <DealerDirectoryInner />
      </Suspense>
      <Footer />
    </main>
  );
}
