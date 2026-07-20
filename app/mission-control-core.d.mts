export type EvidenceStatus =
  | "FRESH"
  | "STALE"
  | "FAILED"
  | "UNKNOWN"
  | "CONFLICTED";

export interface EvidenceItem {
  id: string;
  label: string;
  owner: string;
  source: string;
  observedAt: string;
  status: EvidenceStatus;
  detail: string;
}

export interface Scenario {
  label: string;
  mode: string;
  trigger: string;
  evidence: EvidenceItem[];
}

export interface Evaluation extends Scenario {
  invalidCount: number;
  verifiedCount: number;
  failClosed: boolean;
  gateLabel: string;
  gateReason: string;
  actionState: "BLOCKED" | "HUMAN REVIEW";
  recoveryEligible: boolean;
}

export const INVALID_EVIDENCE_STATES: Set<EvidenceStatus>;
export const CONSEQUENTIAL_ACTIONS: string[];
export const scenarios: Record<"normal" | "degraded" | "manual", Scenario>;
export function evaluateScenario(
  scenario: Scenario,
  reconciled?: boolean,
): Evaluation;
