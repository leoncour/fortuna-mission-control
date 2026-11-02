# FMG SPX/XSP 0DTE research adapter V1 (minimal integration contract)
Status: DOCUMENTATION ONLY; not wired to FMG scheduler or runtime.

Normal checkpoint: **do not load the master or historical experiments**. Existing FMG intelligence captures and schedules remain unchanged. If the packet is already produced, optionally attach `research_rules_id=SPX_XSP_0DTE_V3_5` and `direction=BULL|BEAR|UNCLEAR|DATA_INCOMPLETE`, evidence, confidence and data timestamp; do not invent direction or delay packet delivery. Missing fields are not proof of a valid packet. Preserve original packet schema until tested compatibility.

Only when a novel strategy research request or contradiction arises, read `SPX_XSP_0DTE_MASTER_STRATEGY_V3_0_TO_V3_5.md`, search finding IDs and follow linked source files. Research is offline from the time-critical capture path. No mandatory new GitHub writes, LLM calls or scheduler jobs.

Failure: GitHub unavailability does not block market collection; preserve independent scheduler/execution/persistence status. Adapter is a reference contract, not a deployed code hook.
