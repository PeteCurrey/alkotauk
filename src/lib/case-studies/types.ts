export type VerificationBadge =
  | 'HISTORICAL PROJECT / VERIFIED SOURCES'
  | 'NAMED CUSTOMER / VERIFIED PROJECT'
  | 'INDUSTRY APPLICATION / FIELD PROOF'
  | 'ENGINEERED SYSTEM / BESPOKE RIG';

export interface CaseStudyMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface CaseStudySpecification {
  label: string;
  value: string;
  context?: string;
}

export interface CaseStudyChapter {
  id: string;
  number: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  paragraphs: string[];
  highlightQuote?: {
    text: string;
    attribution?: string;
  };
  metrics?: CaseStudyMetric[];
  specifications?: CaseStudySpecification[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  darkTheme?: boolean;
}

export interface CaseStudyExternalSource {
  title: string;
  publisher: string;
  year?: string;
  doiOrUrl?: string;
  note?: string;
}

export interface CaseStudyWorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  engineeringFocus: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  sector: string;
  clientName?: string;
  clientVisibility: 'named' | 'anonymised' | 'historical' | 'application';
  location: string;
  date: string;
  heroImage: string;
  heroAlt: string;
  headline: string;
  standfirst: string;
  featured?: boolean;
  verified: boolean;
  sourceType: VerificationBadge;
  
  // High-level summary fields
  problem: string;
  requirements: string[];
  solution: string;
  applications: string[];
  
  // Detailed content
  narrativeSections?: Array<{
    title: string;
    paragraphs: string[];
  }>;
  chapters?: CaseStudyChapter[];
  workflowSteps?: CaseStudyWorkflowStep[];
  
  // Technical & Equipment
  equipmentSlugs: string[]; // references canonical products
  specifications?: CaseStudySpecification[];
  metrics?: CaseStudyMetric[];
  technicalNotes?: string[];
  externalSources?: CaseStudyExternalSource[];
  
  // Navigation & Relations
  nextStorySlug: string;
  relatedProductSlugs?: string[];
  relatedIndustries?: string[];
  
  // Call to action
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
