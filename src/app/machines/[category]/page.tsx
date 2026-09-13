import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ComparisonDock from '@/components/comparison/ComparisonDock';
import { getProducts, CANONICAL_CATEGORIES, Product } from '@/lib/products';
import { getSeriesByCategory, fromCategoryRoute, toCategoryRoute } from '@/lib/catalogue/series';
import { getLobbyArticles } from '@/lib/lobby';

// Category Hub Components
import CategoryHero from '@/components/category/CategoryHero';
import WhyTechnology from '@/components/category/WhyTechnology';
import ArchitectureNavigator from '@/components/category/ArchitectureNavigator';
import FeaturedMachines from '@/components/category/FeaturedMachines';
import FullCatalogueSection from '@/components/category/FullCatalogueSection';
import CategoryEngineering from '@/components/category/CategoryEngineering';
import CategoryApplications from '@/components/category/CategoryApplications';
import CategoryLobbyKnowledge from '@/components/category/CategoryLobbyKnowledge';
import CategoryDemoCTA from '@/components/category/CategoryDemoCTA';
import SeenInRealWorld from '@/components/mess-quest/SeenInRealWorld';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Pre-render all canonical category routes
export async function generateStaticParams() {
  const categories = Object.keys(CANONICAL_CATEGORIES);
  const params: Array<{ category: string }> = [];

  for (const cat of categories) {
    params.push({ category: toCategoryRoute(cat) });
    if (cat === 'parts-washer') {
      params.push({ category: 'parts-washer' });
    }
  }

  return params;
}

// Rich metadata configs for all 8 categories
const CATEGORY_METADATA_CONFIG: Record<string, {
  title: string;
  tagline: string;
  statement: string;
  heroImage: string;
  accentColor: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  architectures: Array<{
    id: string;
    name: string;
    tagline: string;
    description: string;
    drive: string;
    powerFuel: string;
    pressureRange: string;
    flowRange: string;
    idealApplication: string;
    representativeImage: string;
  }>;
}> = {
  'hot-water': {
    title: 'Hot Water Pressure Washers',
    tagline: 'High-Temperature Industrial Degreasing & Heavy Washdown',
    statement: 'Alkota hot water pressure washers combine high-pressure kinetic force with up to 95°C thermal energy to melt bonded grease, engine oils, road bitumen, and biological contamination across the UK’s most demanding industrial sectors.',
    heroImage: '/assets/hot-water-gauge-hero.jpg',
    accentColor: '#FF6900',
    metrics: [
      { label: 'Thermal Output', value: 'Up to 95°C', detail: 'Sensible heat for petrochemical dissolution' },
      { label: 'Pressure Range', value: '110 – 350 BAR', detail: 'Hydrostatic blast force' },
      { label: 'Coil Metallurgy', value: 'Schedule 80', detail: 'ASTM A53 seamless cold-rolled steel' },
      { label: 'Coil Warranty', value: '7 Years', detail: 'Industry-exclusive protection standard' },
    ],
    architectures: [
      {
        id: 'belt-drive',
        name: 'Belt-Driven Electric / Oil-Fired',
        tagline: 'Continuous-Duty Haulage & Plant Bay Platform',
        description: 'Low-RPM industrial motor coupled to a triplex ceramic plunger pump via heavy-duty cast iron pulleys and cogged V-belts. Runs cooler, dissipates vibration, and is engineered for continuous multi-shift operation.',
        drive: 'Cogged V-Belt (1450 RPM Low-Speed)',
        powerFuel: '230V 1PH / 400V 3PH Electric Motor + Diesel/Kerosene Burner',
        pressureRange: '138 – 241 BAR (2,000 – 3,500 PSI)',
        flowRange: '15 – 30 L/MIN (4.0 – 8.0 GPM)',
        idealApplication: 'Permanent wash pads, commercial fleet haulage depots, and plant hire service bays.',
        representativeImage: '/assets/products/hot-water-skid.png'
      },
      {
        id: 'all-electric',
        name: 'All-Electric Zero-Emission Range',
        tagline: 'Food Processing, Cleanroom & Mining Plant',
        description: '100% electrically powered and heated pressure washers delivering up to 88°C hot water with zero exhaust gases, zero flames, and zero fossil fuel storage requirements.',
        drive: 'Industrial Electric Triplex Belt Drive',
        powerFuel: '460V / 400V 3-Phase Electric Motor + Incoloy Immersion Heating',
        pressureRange: '69 – 207 BAR (1,000 – 3,000 PSI)',
        flowRange: '8.3 – 18.9 L/MIN (2.2 – 5.0 GPM)',
        idealApplication: 'Enclosed manufacturing halls, pharmaceutical suites, and subterranean facilities.',
        representativeImage: '/assets/products/hot-water-skid.png'
      },
      {
        id: 'diesel-engine',
        name: 'Diesel & Petrol Engine Skids',
        tagline: 'Self-Powered Road & Remote Site Rigs',
        description: 'Independent industrial diesel or petrol engine-driven units with 12V / 230V onboard burner generators. Designed for trailer mounting, service van integration, and remote civil engineering washdown with zero mains power.',
        drive: 'Belt Drive / Gearbox Reduction',
        powerFuel: 'Kohler / Vanguard Diesel / Petrol + 12V Burner',
        pressureRange: '200 – 350 BAR (3,000 – 5,000 PSI)',
        flowRange: '15 – 38 L/MIN (4.0 – 10.0 GPM)',
        idealApplication: 'Civil infrastructure, quarry washing, forestry machinery, and mobile contract cleaning rigs.',
        representativeImage: '/assets/products/ged-12v-skid.png'
      },
      {
        id: 'stationary-gas',
        name: 'Stationary Gas-Fired Cabinets',
        tagline: 'Plant Room & Multi-Bay Remote Systems',
        description: 'Enclosed stationary wash cabinets powered by clean Natural Gas or LPG burners. Installed in dedicated boiler rooms and piped out to multi-bay overhead boom drops with remote operator control stations.',
        drive: 'Industrial Direct / Belt Drive',
        powerFuel: 'Electric Motor + Natural Gas / LPG Burner',
        pressureRange: '110 – 207 BAR (1,600 – 3,000 PSI)',
        flowRange: '11 – 38 L/MIN (3.0 – 10.0 GPM)',
        idealApplication: 'Indoor food factories, automotive workshops, and multi-bay commercial wash centers.',
        representativeImage: '/assets/products/hot-water-skid.png'
      }
    ]
  },
  'cold-water': {
    title: 'Cold Water Pressure Washers',
    tagline: 'High-Flow Hydraulic Impingement & Continuous Industrial Washdown',
    statement: 'Engineered for continuous volumetric rinsing, heavy soil displacement, and aggregate decontamination. Alkota cold water machines focus 100% of input horsepower into flow rate and hydrostatic impact with zero burner overheads.',
    heroImage: '/assets/cold-water-control-hero.jpg',
    accentColor: '#38BDF8',
    metrics: [
      { label: 'Flow Capability', value: 'Up to 38 L/MIN', detail: 'High-volume clay & mud displacement' },
      { label: 'Pressure Range', value: '100 – 350 BAR', detail: 'Deep hydrostatic impingement' },
      { label: 'Pump Duty Cycle', value: '100% Continuous', detail: 'Oversized crankcase triplex pumps' },
      { label: 'Chassis Type', value: 'Tubular Steel', detail: 'Heavy-gauge all-welded construction' },
    ],
    architectures: [
      {
        id: 'electric-stationary',
        name: 'Electric Stationary Wash Units',
        tagline: 'Factory Floor & Wash Bay Systems',
        description: 'Heavy-duty wall-mount or floor-mount electric cold water skids. Piped into low-pressure water mains to deliver dependable, continuous washdown pressure across factory production floors and processing bays.',
        drive: 'Direct Drive / Low-Speed Belt Drive',
        powerFuel: '230V 1PH / 400V 3PH Industrial Electric Motor',
        pressureRange: '100 – 250 BAR (1,500 – 3,600 PSI)',
        flowRange: '12 – 30 L/MIN (3.2 – 8.0 GPM)',
        idealApplication: 'Food processing lines, abattoirs, vehicle valet bays, and manufacturing plants.',
        representativeImage: '/assets/products/ged-12v-skid.png'
      },
      {
        id: 'engine-portable',
        name: 'Petrol & Diesel Engine Portables',
        tagline: 'Off-Grid Heavy Plant & Agricultural Washdown',
        description: 'Roll-cage tubular steel frames equipped with Honda, Vanguard, or Kohler engines. Built to be loaded into pickups or wheeled across muddy farm tracks and construction sites.',
        drive: 'Belt Drive / Direct Drive Reduction',
        powerFuel: 'Unleaded Petrol / Commercial Diesel',
        pressureRange: '180 – 350 BAR (2,600 – 5,000 PSI)',
        flowRange: '15 – 38 L/MIN (4.0 – 10.0 GPM)',
        idealApplication: 'Quarries, plant hire yards, agricultural combine washdown, and concrete contractor sites.',
        representativeImage: '/assets/products/ged-12v-skid.png'
      }
    ]
  },
  'steam': {
    title: 'Industrial Steam Cleaners',
    tagline: '140°C Low-Moisture Vapour Sanitisation & Precision Degreasing',
    statement: 'Alkota industrial steam cleaners generate 140°C–165°C dry saturated vapour steam with minimal water volume (2–6 L/min). Delivering intense thermal sanitisation that kills bacteria and melts heavy grease without puddles or overspray.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
    accentColor: '#A78BFA',
    metrics: [
      { label: 'Vapour Temp', value: '140°C – 165°C', detail: 'Dry saturated thermal sanitisation' },
      { label: 'Water Delivery', value: '2.0 – 6.0 L/M', detail: 'Ultra-low liquid moisture output' },
      { label: 'Operating Pressure', value: '10 – 35 BAR', detail: 'Precision low-recoil delivery' },
      { label: 'Sanitisation', value: 'Chemical Free', detail: 'Kills Listeria & biofilms on contact' },
    ],
    architectures: [
      {
        id: 'steam-electric-oil',
        name: 'Electric Driven / Oil-Fired Steam Cleaners',
        tagline: 'Heavy Industrial Grease & Workshop Platform',
        description: 'Low-flow positive displacement pump feeding a high-temperature Schedule 80 heating coil. Delivers true dry vapour steam for heavy engine rebuilds, machine tooling degreasing, and hydraulic maintenance.',
        drive: 'Direct Drive / Low-RPM Belt Drive',
        powerFuel: '230V 1PH / 400V 3PH + Diesel / Kerosene Burner',
        pressureRange: '15 – 35 BAR (220 – 500 PSI)',
        flowRange: '2.5 – 6.0 L/MIN (0.6 – 1.6 GPM)',
        idealApplication: 'Machine rebuild workshops, engine remanufacturing, aerospace maintenance, and precision tooling.',
        representativeImage: '/assets/products/hot-water-skid.png'
      }
    ]
  },
  'parts-washer': {
    title: 'Aqueous Parts Washers',
    tagline: 'Biodegradable Component Wash & Degreasing Cabinets',
    statement: 'Aqueous hot-water parts cleaning cabinets using biodegradable detergents. Eliminates hazardous solvent degreasing while automatically cleaning automotive, aerospace, and plant machinery components.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
    accentColor: '#10B981',
    metrics: [
      { label: 'Wash Temp', value: 'Up to 80°C', detail: 'Thermal detergent activation' },
      { label: 'Cabinet Formats', value: 'Front & Top Load', detail: 'Turntables up to 72" diameter' },
      { label: 'Solvent Free', value: '100% Aqueous', detail: 'Safe for workshop personnel & EA compliance' },
      { label: 'Oil Separation', value: 'Disc Skimmer', detail: 'Automatic continuous hydrocarbon removal' },
    ],
    architectures: []
  },
  'water-heater': {
    title: 'Continuous Industrial Water Heaters',
    tagline: 'Instant High-Output Inline Water Heating',
    statement: 'Heavy-duty inline water heating modules that instantly convert any cold water pressure washer or industrial wash system into a high-output hot water cleaning operation.',
    heroImage: '/assets/hot-water-gauge-hero.jpg',
    accentColor: '#F59E0B',
    metrics: [
      { label: 'Coil Rating', value: 'Schedule 80', detail: 'Continuous high-pressure heating' },
      { label: 'Fuel Types', value: 'Oil / Natural Gas / LP', detail: 'High-efficiency thermal exchangers' },
      { label: 'Max Pressure', value: 'Up to 350 BAR', detail: 'Preserves full pump discharge force' },
      { label: 'Warranty', value: '7 Years', detail: 'Schedule 80 coil guarantee' },
    ],
    architectures: []
  },
  'trailer': {
    title: 'Mobile Wash Trailers & Custom Rigs',
    tagline: 'Turnkey Road-Legal Mobile Cleaning Platforms',
    statement: 'Bespoke single and tandem-axle mobile wash trailers engineered for civil engineering contractors, local authorities, and remote industrial cleaning operations.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
    accentColor: '#EC4899',
    metrics: [
      { label: 'Axle Systems', value: 'Single / Tandem', detail: 'Type-approved road chassis' },
      { label: 'Water Capacity', value: 'Up to 1000 Litres', detail: 'Baffled heavy-duty poly storage' },
      { label: 'Power Units', value: 'Diesel / Petrol', detail: 'Off-grid independent operation' },
      { label: 'Build Origin', value: 'Turnkey Alkota UK', detail: 'Commissioned ready for highway use' },
    ],
    architectures: []
  },
  'water-treatment': {
    title: 'Water Recovery & Treatment Systems',
    tagline: 'Closed-Loop Recycling & Trade Effluent Compliance',
    statement: 'Vacuum recovery, oil-water separation, media filtration, and bulk wastewater evaporators supporting UK Environment Agency discharge compliance.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
    accentColor: '#06B6D4',
    metrics: [
      { label: 'Recovery Method', value: 'Berm / Vac Suction', detail: 'Captures 100% of wash runoff' },
      { label: 'Filtration', value: 'Media & Hydrocyclone', detail: 'Suspended solids separation' },
      { label: 'Compliance', value: 'UK EA Standard', detail: 'Trade effluent discharge compliance' },
      { label: 'Operation', value: 'Continuous Recycling', detail: 'Drastically reduces mains water costs' },
    ],
    architectures: []
  },
  'space-heater': {
    title: 'Industrial Space Heaters',
    tagline: 'High-Output Indirect & Direct Fired Workshop Heating',
    statement: 'High-efficiency industrial forced-air heaters for construction sites, warehouses, and agricultural buildings needing reliable bulk heating during winter operations.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
    accentColor: '#EF4444',
    metrics: [
      { label: 'Thermal Fuel', value: 'Diesel / Kerosene', detail: 'High-efficiency clean combustion' },
      { label: 'Duty Cycle', value: 'Continuous Workshop', detail: 'Thermostatically controlled' },
      { label: 'Mobility', value: 'Heavy Wheel Kit', detail: 'Easy positioning across job sites' },
      { label: 'Safety', value: 'Flame-Out Protection', detail: 'Automated safety shut-off' },
    ],
    architectures: []
  }
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const dbCat = fromCategoryRoute(category);
  const config = CATEGORY_METADATA_CONFIG[dbCat] || CATEGORY_METADATA_CONFIG[category];
  const catInfo = CANONICAL_CATEGORIES[dbCat];
  
  const title = config?.title || catInfo?.name || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const description = config?.statement || catInfo?.description || `Alkota UK industrial ${title.toLowerCase()} systems engineered in South Dakota for continuous-duty performance.`;

  return {
    title: `${title} | Industrial Specification Fleet | Alkota UK`,
    description,
    alternates: {
      canonical: `https://alkota.co.uk/machines/${toCategoryRoute(category)}`,
    },
    openGraph: {
      title: `${title} | Alkota UK`,
      description,
      type: 'website',
      images: config?.heroImage ? [config.heroImage] : [],
    }
  };
}

export default async function MachineCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const dbCategory = fromCategoryRoute(categorySlug);
  
  const [allProducts, categorySeries, lobbyArticles] = await Promise.all([
    getProducts({ category: dbCategory }),
    getSeriesByCategory(dbCategory),
    getLobbyArticles().catch(() => [])
  ]);

  if (allProducts.length === 0 && !CANONICAL_CATEGORIES[dbCategory]) {
    notFound();
  }

  const catInfo = CANONICAL_CATEGORIES[dbCategory];
  const config = CATEGORY_METADATA_CONFIG[dbCategory] || CATEGORY_METADATA_CONFIG[categorySlug] || {
    title: catInfo?.name || categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    tagline: catInfo?.tagline || 'Industrial Specification Cleaning Systems',
    statement: catInfo?.description || 'Built for continuous industrial duty, Alkota cleaning systems deliver uncompromising durability and engineering excellence.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
    accentColor: '#FF6900',
    metrics: [
      { label: 'Duty Cycle', value: '100% Industrial', detail: 'Continuous multi-shift operations' },
      { label: 'Build Origin', value: 'South Dakota', detail: '60+ years American engineering' },
      { label: 'UK Support', value: 'Direct Spares', detail: 'Full technical engineering backup' },
      { label: 'Warranty', value: 'Full Standard', detail: 'Industrial manufacturer warranty' }
    ],
    architectures: []
  };

  // Filter curated featured products
  const featuredProducts = allProducts.filter(p => p.featured || p.is_elite_series).slice(0, 3);
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 3);

  // Match relevant Lobby articles
  const relevantArticles = lobbyArticles.filter(a => {
    const slugMatch = a.category_slug?.includes(categorySlug) || a.slug?.includes(categorySlug);
    const tagMatch = a.tags?.some(t => t.toLowerCase().includes(categorySlug.replace('-', ' ')));
    return slugMatch || tagMatch;
  });
  const displayLobbyArticles = relevantArticles.length > 0 ? relevantArticles : lobbyArticles.slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-[#1A1A18] font-normal pb-0">
      <Navigation />

      {/* ─── 01. FULL-WIDTH CATEGORY HERO ─────────────────────────────────── */}
      <CategoryHero
        categorySlug={categorySlug}
        categoryName={config.title}
        tagline={config.tagline}
        statement={config.statement}
        heroImage={config.heroImage}
        accentColor={config.accentColor}
        metrics={config.metrics}
        totalModels={allProducts.length}
      />

      {/* ─── 02. WHY THIS TECHNOLOGY ──────────────────────────────────────── */}
      <WhyTechnology categorySlug={categorySlug} />

      {/* ─── 03. MACHINE ARCHITECTURE NAVIGATOR (IF APPLICABLE) ───────────── */}
      {config.architectures && config.architectures.length > 0 && (
        <ArchitectureNavigator
          categorySlug={categorySlug}
          architectures={config.architectures}
          allCategoryProducts={allProducts}
        />
      )}

      {/* ─── 04. FEATURED CURATED SYSTEMS ─────────────────────────────────── */}
      {displayFeatured.length > 0 && (
        <FeaturedMachines
          categorySlug={categorySlug}
          featuredProducts={displayFeatured}
        />
      )}

      {/* ─── 05. VISUAL ENGINEERING DEEP DIVE ─────────────────────────────── */}
      <CategoryEngineering categorySlug={categorySlug} />

      {/* ─── 06. FULL FILTERABLE CATALOGUE WITH SERIES-FIRST NAVIGATION ─────── */}
      <Suspense fallback={
        <section className="bg-[#FAF9F5] border-b border-[#E5E5E0] py-20 px-6 sm:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="py-12 font-mono text-xs text-[#888] uppercase tracking-wider animate-pulse">
              Loading {config.title} catalogue...
            </div>
          </div>
        </section>
      }>
        <FullCatalogueSection
          categorySlug={categorySlug}
          categoryName={config.title}
          allProducts={allProducts}
          seriesList={categorySeries}
        />
      </Suspense>

      {/* ─── 06B. SEEN IN THE REAL WORLD // MESS QUEST ─────────────────────── */}
      <SeenInRealWorld category={categorySlug} />

      {/* ─── 07. REAL-WORLD SECTOR APPLICATIONS ───────────────────────────── */}
      <CategoryApplications categorySlug={categorySlug} />

      {/* ─── 08. THE LOBBY TECHNICAL KNOWLEDGE ────────────────────────────── */}
      <CategoryLobbyKnowledge
        categorySlug={categorySlug}
        articles={displayLobbyArticles}
      />

      {/* ─── 08B. EDITORIAL FIELD CASE LINK (HOT WATER SPECIFIC) ────────────── */}
      {dbCategory === 'hot-water' && (
        <section className="bg-[#121212] text-white py-12 px-6 sm:px-12 border-t border-b border-[#222]">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-1">
                Field Case // Mobile Crane & Fleet Maintenance
              </span>
              <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white">
                One Great Northern: Keeping Heavy Equipment Ready for the Next Lift
              </h3>
              <p className="text-xs text-[#AAA] max-w-2xl mt-1 font-normal">
                How Chesterfield crane hire specialist One Great Northern deploys Alkota hot-water cleaning to maintain multi-axle chassis and outriggers.
              </p>
            </div>
            <Link
              href="/resources/case-studies/one-great-northern"
              className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-normal transition-colors no-underline shrink-0"
            >
              <span>Read Field Feature →</span>
            </Link>
          </div>
        </section>
      )}

      {/* ─── 09. ON-SITE DEMONSTRATION & SPECIFICATION CTA ────────────────── */}
      <CategoryDemoCTA
        categorySlug={categorySlug}
        categoryName={config.title}
      />

      <ComparisonDock />
      <Footer />
    </main>
  );
}
