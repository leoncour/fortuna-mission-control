# Flower 2.0 SPX/XSP 0DTE research adapter V1 (minimal integration contract)
Status: DOCUMENTATION ONLY; not wired to Flower 2.0 engine/runtime.

At session setup, load and schema-check `SPX_XSP_0DTE_ACTIVE_RULES.json` once when connected; retain last independently validated rules version if GitHub unavailable. **A cached rules file never substitutes for fresh broker quotes or safety checks**. Fail closed if required rules are missing, incompatible or untrusted. No additional scheduler, checkpoint, mandatory LLM call, or routine master-file read.

For a proposed trade, use FMG direction packet if valid and fresh; BULL->bull put candidate; BEAR->bear call candidate; UNCLEAR->neutral candidate; DATA_INCOMPLETE->bounded recovery/rejection. Reprice immediately before proposal and fill; compute full expiration payoff, min/max, breakpoints, tails and breakevens; require gross maximum expiration profit >=$500 and gross global maximum expiration loss <=$300. Evaluate liquidity, margin, legging, costs separately and require explicit human order approval. If no qualifying candidate, report quantified rejection. The rules file is not trade authorization.

For novel strategies or conflicting findings only: open the master, identify source IDs, write a separate dated research experiment, validate, and update master with verified GitHub readback. Preserve existing Flower lifecycle, EOD/EOW, schedules and independent persistence recovery.
