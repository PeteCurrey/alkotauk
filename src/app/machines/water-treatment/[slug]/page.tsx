import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WaterTreatmentDetailClient from './WaterTreatmentDetailClient';

const SYSTEMS_DB: Record<string, any> = {
  'vfs': {
    id: 'vfs',
    badge: 'Vacuum System',
    name: 'Alkota 8-VFS-1 Series',
    tagline: 'Portable Water Reclaiming System',
    capacity: 'High Volume Performance',
    size: 'Small Compact Design',
    features: [
      'Reduces 99% of free petroleum hydrocarbons load',
      'On-demand system with high volume performance',
      'Easy to maintain with minimal operational costs',
      'Trailer Mount or portable wheel kit available',
      'Discharge point of choice'
    ],
    description: 'Protecting the environment from wash water runoff and complying with governmental storm drain regulations is simple, economical and effective with the Alkota Vacuum Filtration System (VFS).',
    image: 'https://easttnchemicals.com/wp-content/uploads/2023/11/Water_Treatment_8_VFS_1_Alkota-1024x1024.jpg',
    overview: 'The VFS is designed to be used as a portable or stationary treatment system that guarantees results with ease of service while minimizing disposal cost. This automatic and easy to use zero or controlled discharge system has been uniquely designed to keep businesses operating without expensive filter cost, down time and additional manpower. The first two phases of filtration operate and flow under a vacuum or negative void to enhance flow and extended filter life.',
    specs: [
      { label: 'Hydrocarbon Removal', value: 'Up to 99%' },
      { label: 'Design', value: 'Small Compact Frame' },
      { label: 'Portability', value: 'Trailer or Wheel Kit' },
      { label: 'Filtration', value: 'Negative Void Vacuum' }
    ]
  },
  'csf-10': {
    id: 'csf-10',
    badge: 'Media Filtration',
    name: 'Alkota CSF-10',
    tagline: 'Media Sand Filtration',
    capacity: '10 GPM Capacity',
    size: '300 lbs Sand Capacity',
    features: ['Ultra Low Maintenance', 'High-Efficiency Media', 'Affordable Compliance', 'Automated Backwash Options'],
    description: 'A low-maintenance, cost-effective way of working with strict water conservation regulations that limit waste streams from pressure washers.',
    image: 'https://easttnchemicals.com/wp-content/uploads/2023/11/Water_Treatment_8_VFS_1_Alkota-1024x1024.jpg',
    overview: 'The CSF-10 Media Filtration unit is the definitive solution for stationary wash bays and industrial operations. By passing wastewater through 300 lbs of highly efficient filtration media, it removes suspended solids, oils, and greases, allowing for safe discharge or closed-loop recycling.',
    specs: [
      { label: 'Flow Rate', value: 'Up to 10 GPM' },
      { label: 'Media Capacity', value: '300 lbs Custom Sand/Gravel' },
      { label: 'Maintenance', value: 'Low / Easy Backwash' },
      { label: 'Footprint', value: 'Vertical Space-Saving Tank' }
    ]
  },
  'evaporator': {
    id: 'evaporator',
    badge: 'Wastewater Evaporation',
    name: 'Alkota Evaporator Series',
    tagline: '15/20 NG LP Systems',
    capacity: '20 GPH Evaporation',
    size: 'Maximum 480 Gal/Day',
    features: [
      'Clean Burning & Quiet LP/NG',
      'Defoamer pump standard',
      '4" drain port included',
      '115V High Efficiency Burner',
      'Massively reduces disposal costs'
    ],
    description: 'You need an Alkota evaporator if you have water that is dirty and expensive to dispose of. This system evaporates the bulk of your wastewater cleanly and efficiently.',
    image: 'https://www.alkota.com/wp-content/uploads/2018/07/20-30-Evaporator.jpg',
    overview: 'Operating on LP or natural gas, the Alkota Evaporator Series is clean burning, quiet, and can be used almost anywhere. It effectively evaporates the bulk of your wastewater, leaving only a small fraction of solid waste for disposal. With a maximum rate of 20 gallons per hour (up to 480 gallons per day), it is the ultimate tool for cutting expensive wastewater removal costs.',
    specs: [
      { label: 'Evaporation Rate', value: '20 Gallons Per Hour' },
      { label: 'Max Daily Volume', value: '480 Gallons Per Day' },
      { label: 'Burner Power', value: '115V Electric + LP/NG' },
      { label: 'Hardware', value: 'Defoamer Pump / 4" Drain' }
    ]
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = SYSTEMS_DB[slug];
  if (!system) return { title: 'Water Treatment System | Alkota UK' };

  return {
    title: `${system.name} — ${system.tagline} | Alkota UK`,
    description: system.description,
    openGraph: {
      title: `${system.name} | Alkota UK Water Treatment`,
      description: system.description,
      url: `https://alkota.co.uk/machines/water-treatment/${slug}`,
    },
  };
}

export default async function WaterTreatmentProductPage({ params }: Props) {
  const { slug } = await params;
  const system = SYSTEMS_DB[slug];

  if (!system) {
    notFound();
  }

  return <WaterTreatmentDetailClient system={system} slug={slug} />;
}
