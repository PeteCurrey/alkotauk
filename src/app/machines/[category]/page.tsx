import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProducts, CANONICAL_CATEGORIES, Product } from '@/lib/products';
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

// ─────────────────────────────────────────────────────────────────────────────
// METADATA DEFINITIONS PER CATEGORY
// ─────────────────────────────────────────────────────────────────────────────
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
    representativeModelSlug?: string;
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
      },
      {
        id: 'direct-drive',
        name: 'Compact Direct-Drive Portables',
        tagline: 'Manoeuvrable Workshop & Agricultural Washers',
        description: 'Compact 4-wheel mobile chassis with direct-coupled hollow-shaft triplex pumps. Lightweight and easy to navigate through narrow farm buildings and vehicle service workshops.',
        drive: 'Direct Drive Flange Mount (2800 RPM)',
        powerFuel: '230V 1PH / 400V 3PH + Diesel Burner',
        pressureRange: '110 – 180 BAR (1,600 – 2,600 PSI)',
        flowRange: '9 – 15 L/MIN (2.4 – 4.0 GPM)',
        idealApplication: 'Agricultural workshops, car dealerships, and light plant maintenance.',
        representativeImage: '/assets/products/hot-water-skid.png'
      }
    ]
  },
  'cold-water': {
    title: 'Cold Water Pressure Washers',
    tagline: 'High-Flow Hydraulic Impingement & Continuous Industrial Washdown',
    statement: 'Engineered for continuous volumetric rinsing, heavy soil displacement, and aggregate decontamination. Alkota cold water machines focus 100% of input horsepower into flow rate and hydrostatic impact with zero burner overheads.',
    heroImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80',
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
      },
      {
        id: 'electric-mobile',
        name: 'Mobile Electric Hand-Truck Washers',
        tagline: 'Agile Workshop & Facility Maintenance',
        description: 'Compact two-wheel hand-truck format with non-marking tyres and durable powder-coated steel roll frames. Plug-and-play operation for facilities maintenance and machinery rinsing.',
        drive: 'Direct Drive Flange Mount',
        powerFuel: '230V 13A/16A Single Phase Electric',
        pressureRange: '100 – 160 BAR (1,500 – 2,300 PSI)',
        flowRange: '8 – 14 L/MIN (2.1 – 3.7 GPM)',
        idealApplication: 'Property maintenance, facility washrooms, vehicle forecourts, and engineering workshops.',
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
      },
      {
        id: 'steam-gas-fired',
        name: 'Stationary Gas-Fired Steam Cleaners',
        tagline: 'Indoor Food & Pharmaceutical Processing Plant',
        description: 'Clean-burning Natural Gas or LPG stationary steam generators. Piped into food production lines for conveyor decontamination, microbial biofilm eradication, and CIP sanitisation without chemical residues.',
        drive: 'Continuous-Duty Electric Pump Unit',
        powerFuel: 'Electric Motor + Natural Gas / LPG Burner',
        pressureRange: '10 – 30 BAR (150 – 435 PSI)',
        flowRange: '2.0 – 5.0 L/MIN (0.5 – 1.3 GPM)',
        idealApplication: 'Food & beverage packaging lines, dairy processing, commercial bakeries, and cleanroom facilities.',
        representativeImage: '/assets/products/hot-water-skid.png'
      }
    ]
  }
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const dbCat = category === 'parts-washers' ? 'parts-washer' : category;
  const config = CATEGORY_METADATA_CONFIG[category];
  const catInfo = CANONICAL_CATEGORIES[dbCat];
  
  const title = config?.title || catInfo?.name || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const description = config?.statement || catInfo?.description || `Alkota UK industrial ${title.toLowerCase()} systems engineered in South Dakota for continuous-duty performance.`;

  return {
    title: `${title} | Industrial Specification | Alkota UK`,
    description,
    alternates: {
      canonical: `https://alkota.co.uk/machines/${category}`,
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
  const dbCategory = categorySlug === 'parts-washers' ? 'parts-washer' : categorySlug;
  
  const [allProducts, lobbyArticles] = await Promise.all([
    getProducts({ category: dbCategory }),
    getLobbyArticles().catch(() => [])
  ]);

  const catInfo = CANONICAL_CATEGORIES[dbCategory];
  const config = CATEGORY_METADATA_CONFIG[categorySlug] || {
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
    architectures: [
      {
        id: 'industrial-chassis',
        name: 'Standard Industrial Chassis',
        tagline: 'Heavy-Duty Continuous Duty Platform',
        description: 'Engineered for tough industrial applications with heavy-gauge steel frame and premium components.',
        drive: 'Industrial Pump Assembly',
        powerFuel: 'Electric / Engine Driven',
        pressureRange: 'Heavy Duty',
        flowRange: 'Standard Flow',
        idealApplication: 'Industrial workshops and manufacturing facilities.',
        representativeImage: '/assets/products/hot-water-skid.png'
      }
    ]
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

      {/* ─── 03. MACHINE ARCHITECTURE NAVIGATOR ───────────────────────────── */}
      <ArchitectureNavigator
        categorySlug={categorySlug}
        architectures={config.architectures}
        allCategoryProducts={allProducts}
      />

      {/* ─── 04. FEATURED CURATED SYSTEMS ─────────────────────────────────── */}
      <FeaturedMachines
        categorySlug={categorySlug}
        featuredProducts={displayFeatured}
      />

      {/* ─── 05. VISUAL ENGINEERING DEEP DIVE ─────────────────────────────── */}
      <CategoryEngineering categorySlug={categorySlug} />

      {/* ─── 06. FULL FILTERABLE CATALOGUE ────────────────────────────────── */}
      <FullCatalogueSection
        categorySlug={categorySlug}
        categoryName={config.title}
        allProducts={allProducts}
      />

      {/* ─── 06B. SEEN IN THE REAL WORLD // MESS QUEST ─────────────────────── */}
      <SeenInRealWorld category={categorySlug} />

      {/* ─── 07. REAL-WORLD SECTOR APPLICATIONS ───────────────────────────── */}
      <CategoryApplications categorySlug={categorySlug} />

      {/* ─── 08. THE LOBBY TECHNICAL KNOWLEDGE ────────────────────────────── */}
      <CategoryLobbyKnowledge
        categorySlug={categorySlug}
        articles={displayLobbyArticles}
      />

      {/* ─── 09. ON-SITE DEMONSTRATION & SPECIFICATION CTA ────────────────── */}
      <CategoryDemoCTA
        categorySlug={categorySlug}
        categoryName={config.title}
      />

      <Footer />
    </main>
  );
}
