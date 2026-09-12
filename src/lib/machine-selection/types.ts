import { Product } from '@/lib/products';
import { UnitSystem } from '@/lib/comparison/types';

export type ApplicationId =
  | 'FLEET_VEHICLE_CLEANING'
  | 'AGRICULTURAL_CLEANING'
  | 'CONSTRUCTION_HEAVY_PLANT'
  | 'INDUSTRIAL_DEGREASING'
  | 'HIGH_TEMP_SANITISATION'
  | 'WORKSHOP_PARTS_WASHING'
  | 'MOBILE_TRAILER_CLEANING'
  | 'WATER_TREATMENT_RECYCLING'
  | 'NOT_SURE';

export type WaterTypeRequirement = 'cold' | 'hot' | 'steam' | 'aqueous_parts' | 'not_sure';

export type PowerPreference = 'electric' | 'petrol' | 'diesel' | 'engine' | 'any';

export type VoltagePreference = '110v' | '230v' | '400v' | 'any';

export type PhasePreference = 1 | 3 | 'any';

export type MobilityPreference = 'portable' | 'stationary' | 'trailer' | 'skid' | 'any';

export interface SelectionRequirements {
  application: ApplicationId;
  waterType: WaterTypeRequirement;
  minPressureBar?: number | null;
  minFlowLpm?: number | null;
  powerSource: PowerPreference;
  voltage?: VoltagePreference;
  phase?: PhasePreference;
  mobility: MobilityPreference;
  tankRequired?: boolean;
  minTankCapacityL?: number | null;
  preferences?: string[];
  unitSystem: UnitSystem;
}

export type MatchStatus = 'STRONG_MATCH' | 'POSSIBLE_MATCH' | 'DOES_NOT_MEET';

export interface MatchExplanation {
  reasons: string[];
  unknowns: string[];
  failureReasons: string[];
}

export interface ScoredMachine {
  machine: Product;
  status: MatchStatus;
  score: number;
  explanation: MatchExplanation;
}

export interface SelectionResult {
  shortlist: ScoredMachine[];         // Strictly STRONG_MATCH machines (up to 3)
  possibleMatches: ScoredMachine[];   // Strictly POSSIBLE_MATCH machines with unverified specs ("Worth confirming")
  unmetMachines: ScoredMachine[];     // Evaluated machines that failed hard requirements
  totalEvaluated: number;
  totalQualified: number;             // Count of strong + possible
  activeRequirementsSummary: string[];
  isConflicted?: boolean;             // True if requirements are mutually exclusive or no machines qualified
  conflictNotice?: string;            // Explanation of conflict
  recommendations?: string[];         // Actionable guidance for user
}
