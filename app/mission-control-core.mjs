export const INVALID_EVIDENCE_STATES = new Set([
  "STALE",
  "FAILED",
  "UNKNOWN",
  "CONFLICTED",
]);

export const CONSEQUENTIAL_ACTIONS = [
  "Propose new action",
  "Increase exposure",
  "Prepare instruction",
  "Schedule automation",
  "Submit consequential action",
];

const freshEvidence = [
  {
    id: "position_order_reconciliation",
    label: "Position and activity reconciliation",
    owner: "Operations Watch",
    source: "Synthetic operations ledger",
    observedAt: "14:02 SGT",
    status: "FRESH",
    detail: "Positions and pending activity reconcile.",
  },
  {
    id: "authoritative_capital_state",
    label: "Authoritative capital state",
    owner: "Capital Shield",
    source: "Synthetic capital register",
    observedAt: "14:03 SGT",
    status: "FRESH",
    detail: "Authoritative state is known.",
  },
  {
    id: "final_judgement",
    label: "Independent final judgement",
    owner: "Validation Watch",
    source: "Synthetic validation record",
    observedAt: "14:04 SGT",
    status: "FRESH",
    detail: "Independent review is complete.",
  },
  {
    id: "recovery_reconciliation",
    label: "Recovery reconciliation",
    owner: "Mission Controller",
    source: "Synthetic recovery record",
    observedAt: "14:05 SGT",
    status: "FRESH",
    detail: "Fresh readback and reconciliation are recorded.",
  },
];

export const scenarios = {
  normal: {
    label: "Normal",
    mode: "NORMAL",
    trigger: "All four authoritative evidence checks are fresh and reconciled.",
    evidence: freshEvidence,
  },
  degraded: {
    label: "Degraded",
    mode: "DEGRADED",
    trigger: "A required activity record exceeded its declared freshness window.",
    evidence: freshEvidence.map((item) =>
      item.id === "position_order_reconciliation"
        ? {
            ...item,
            observedAt: "13:31 SGT",
            status: "STALE",
            detail: "Timestamp is stale by 19 minutes.",
          }
        : item,
    ),
  },
  manual: {
    label: "Manual Survival",
    mode: "MANUAL_SURVIVAL",
    trigger: "Authoritative state is unavailable and two evidence checks conflict.",
    evidence: freshEvidence.map((item) => {
      if (item.id === "authoritative_capital_state") {
        return {
          ...item,
          observedAt: "Not available",
          status: "UNKNOWN",
          detail: "No authoritative readback is available.",
        };
      }
      if (item.id === "final_judgement") {
        return {
          ...item,
          status: "CONFLICTED",
          detail: "Two synthetic records disagree.",
        };
      }
      return item;
    }),
  },
};

export function evaluateScenario(scenario, reconciled = false) {
  const evidence = reconciled
    ? freshEvidence.map((item) => ({
        ...item,
        observedAt: "14:12 SGT",
        detail: "Fresh authoritative synthetic readback reconciled.",
      }))
    : scenario.evidence;
  const invalid = evidence.filter((item) =>
    INVALID_EVIDENCE_STATES.has(item.status),
  );
  const failClosed = invalid.length > 0;

  return {
    ...scenario,
    evidence,
    invalidCount: invalid.length,
    verifiedCount: evidence.length - invalid.length,
    failClosed,
    mode: reconciled ? "RECOVERY_REVIEW" : scenario.mode,
    gateLabel: failClosed ? "ACTION BLOCKED" : "HUMAN APPROVAL REQUIRED",
    gateReason: failClosed
      ? `${invalid.length} mandatory evidence check${invalid.length === 1 ? " is" : "s are"} invalid. Fresh authoritative readback and reconciliation are required.`
      : reconciled
        ? "Evidence is fresh again. Recovery still requires an explicit human-reviewed mode transition."
        : "Evidence is fresh. Fortuna may recommend, but final authority remains human-only.",
    actionState: failClosed ? "BLOCKED" : "HUMAN REVIEW",
    recoveryEligible: reconciled,
  };
}
