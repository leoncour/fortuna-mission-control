# FMG ↔ Flower 2.0 Research Adapter — Simulation and Integration Status

**2026-11-02 | Status: PARTIAL / NOT WIRED INTO EXISTING RUNTIMES**

## Files
- [Active rules](../SPX_XSP_0DTE_ACTIVE_RULES.json)
- [FMG contract](../FMG_RESEARCH_ADAPTER_V1.md)
- [Flower contract](../FLOWER_2_0_RESEARCH_ADAPTER_V1.md)
- [Master evidence registry](../SPX_XSP_0DTE_MASTER_STRATEGY_V3_0_TO_V3_5.md)
- [Offline simulation script](simulate_fmg_flower.py)

## Run
`python3 simulate_fmg_flower.py` from this directory. Requires Python 3 standard library only. Prints seven PASS lines if all assertions pass; exits nonzero on failure.

## Scope and verified limits
A separate independent local Python payoff check confirmed V3.0 assumed $502 credit -> +$502 max profit / -$298 max expiration payoff, $450 -> +$450/-$350, $400 -> +$400/-$400. The committed script was not independently executed against the repository checkout in this session; its end-to-end PASS status remains **UNVERIFIED** until run in an actual checkout/CI.

The simulation uses synthetic FMG packets and explicitly assumed premiums. It tests schema/version, direction, missing data, stale quotes and gross payoff limits. It does NOT connect to FMG's unattended runtime, Flower's live engine, IBKR, market-data feeds, scheduling, actual trade fills, or GitHub persistence recovery. No orders or scheduler changes.

## Blocker
Only `leoncour/fortuna-mission-control` is discoverable in the current connected GitHub installation. The actual FMG and Flower 2.0 runtime repositories or executable paths were not accessible. To finish real integration, locate/grant access to both runtimes, inspect their existing packet ingestion and candidate-generation interfaces, add minimal adapters, run synthetic integration tests and replay a session, and verify actual commit SHAs/readback. Do not claim operational cutover before this is done.

## Acceptance criteria
1. FMG produces a versioned packet without extra blocking research calls.
2. Flower reads active rules once/session, validates packet and freshness, and computes complete global payoff.
3. Missing/stale/duplicate packets are rejected/recovered safely.
4. Quote degradation $502->$450 forces rejection under both targets.
5. Existing FMG :00/:30/Watchdog and Flower schedules continue independently of GitHub persistence failures.
6. Actual integration test passes against both real runtime entrypoints.
