import { Product } from '@/lib/products';

export type UnitSystem = 'metric' | 'imperial';

export interface SpecValue {
  display: string;
  raw?: string | number | boolean | null;
  unit?: string;
  isSpecified: boolean;
}

export interface SpecRow {
  key: string;
  label: string;
  tooltip?: string;
  values: Record<string, SpecValue>; // key is product slug
  isDifferent: boolean;
  categoryPriority?: string[]; // categories where this row is high priority
}

export interface SpecGroup {
  id: string;
  title: string;
  description?: string;
  iconName?: string;
  rows: SpecRow[];
}

export interface ComparisonHighlight {
  type: 'pressure' | 'flow' | 'power' | 'mobility' | 'heating' | 'general';
  machineSlug: string;
  machineModel: string;
  label: string;
  detail: string;
}

export interface ComparisonState {
  selectedSlugs: string[];
  unitSystem: UnitSystem;
  showDifferencesOnly: boolean;
}

export interface MachineEcosystemSummary {
  machineSlug: string;
  partsCount: number;
  attachmentsCount: number;
  topPump?: string;
  topAttachment?: string;
}
