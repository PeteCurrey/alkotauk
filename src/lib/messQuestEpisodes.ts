export type MessQuestEpisode = {
  id: number;
  slug: string;
  youtubeId: string;
  title: string;
  subtitle: string;
  description: string;
  machine: string;
  industry: string;
  operatingSpec: string;
  duration: string;
  location: string;
  posterImage: string;
};

export const messQuestEpisodes: MessQuestEpisode[] = [
  {
    id: 1,
    slug: "asphalt-and-crude-degreasing",
    youtubeId: "vFnvcx3vRUY",
    title: "Asphalt & Heavy Bitumen Rebuild",
    subtitle: "Tackling 10 years of baked-on tar and hydraulic fluid on road paving machinery.",
    description: "The Mess Quest team heads into an active road resurfacing plant to strip hardened bitumen, heavy grease, and mineral dirt from a commercial paving rig using 200 bar water at 90°C.",
    machine: "Alkota 420X4 Hot Water",
    industry: "Construction & Surfacing",
    operatingSpec: "200 BAR @ 90°C Hot Water",
    duration: "4:18",
    location: "Commercial Surfacing Depot",
    posterImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    slug: "agricultural-combine-harvest-washdown",
    youtubeId: "vFnvcx3vRUY",
    title: "Agricultural Combine Harvester Decon",
    subtitle: "High-volume field cleaning to prevent bio-security risks and mechanical overheating.",
    description: "Cleaning a 20-tonne combine harvester caked with compacted straw, chaff, and hydraulic oil film using high-volume hot water washing.",
    machine: "Alkota 4305XD4 Heavy Duty",
    industry: "Agriculture",
    operatingSpec: "240 BAR @ 85°C",
    duration: "5:42",
    location: "Arable Farm Workshop",
    posterImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    slug: "food-processing-line-steam-sanitisation",
    youtubeId: "vFnvcx3vRUY",
    title: "Food Processing Line Steam Sanitisation",
    subtitle: "140°C saturated dry vapour steam applied to commercial conveyor lines.",
    description: "Eliminating stubborn animal fats and sanitising production line rollers without flooding the facility or damaging sensitive electrical instrumentation.",
    machine: "Alkota Steam Oil-Fired Series",
    industry: "Food & Beverage",
    operatingSpec: "140°C Vapour Steam @ 35 BAR",
    duration: "3:55",
    location: "Food Packaging Facility",
    posterImage: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    slug: "commercial-hgv-fleet-road-film",
    youtubeId: "vFnvcx3vRUY",
    title: "Commercial HGV Fleet Road Film Blast",
    subtitle: "Winter road salt and corrosive grime stripped from 44-tonne tractor units.",
    description: "A rapid dual-operator washdown trial testing the speed and thermal coverage of bespoke trailer-mounted Alkota systems.",
    machine: "Alkota Tandem Mobile Trailer Rig",
    industry: "Transport & Logistics",
    operatingSpec: "Dual 180 BAR Lances @ 80°C",
    duration: "6:10",
    location: "Logistics Hub Wash Bay",
    posterImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80"
  }
];
