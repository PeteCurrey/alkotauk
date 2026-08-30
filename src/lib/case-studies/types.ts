export type VerificationBadge =
  | 'HISTORICAL PROJECT / VERIFIED SOURCES'
  | 'NAMED CUSTOMER / VERIFIED PROJECT'
  | 'NAMED CUSTOMER / FIELD APPLICATION'
  | 'INDUSTRY APPLICATION / FIELD PROOF'
  | 'ALKOTA ENGINEERING / BESPOKE SYSTEMS';

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

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  isDocumentary?: boolean;
}

export interface CaseStudyTimelineEvent {
  yearOrDate: string;
  headline: string;
  description: string;
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
  image?: CaseStudyImage;
  timeline?: CaseStudyTimelineEvent[];
  darkTheme?: boolean;
}

export interface CaseStudyExternalSource {
  title: string;
  publisher: string;
  year?: string;
  url?: string;
  doiOrUrl?: string;
  note?: string;
  author?: string;
}

export interface CaseStudyWorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  engineeringFocus: string;
}

export interface CaseStudyEvidence {
  installationImages?: string[];
  equipmentImages?: string[];
  equipmentModels?: string[];
  installationDate?: string;
  clientQuote?: string;
  clientQuoteAuthor?: string;
  clientQuoteRole?: string;
  measuredResults?: string[];
  beforeImages?: string[];
  afterImages?: string[];
  serviceRecords?: string[];
  projectLocation?: string;
  suppliedBy?: string;
  verificationNotes?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  sector: string;
  hierarchyLevel?: 'FLAGSHIP_HISTORY' | 'CUSTOMER_STORY' | 'INDUSTRY_APPLICATION' | 'BESPOKE_SYSTEM';
  clientName?: string;
  clientVisibility: 'named' | 'anonymised' | 'historical' | 'application';
  location: string;
  date: string;
  heroImage: string;
  heroAlt: string;
  heroCaption?: string;
  heroCredit?: string;
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
    image?: CaseStudyImage;
  }>;
  chapters?: CaseStudyChapter[];
  workflowSteps?: CaseStudyWorkflowStep[];
  timeline?: CaseStudyTimelineEvent[];
  
  // Optional customer evidence for future progressive enrichment
  evidence?: CaseStudyEvidence;
  
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
