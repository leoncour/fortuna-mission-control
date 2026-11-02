# SPX / XSP 0DTE Strategy — Master Research & FMG–Flower 2.0 Handover (V3.0–V3.5)
Date: 2026-11-02
Status: RESEARCH / DESIGN ONLY — not approved for live deployment, no trades placed by this document.
Search tags: SPX, SPXW, XSP, 0DTE, zero DTE, iron condor, mixed-width, broken-wing butterfly, FMG, Flower 2.0, directional, premium integrity, V3.0, V3.4, V3.5.

## Purpose and ownership
This is the canonical *conversation research consolidation* for SPX/XSP 0DTE payoff design. Earlier files in this directory remain historical research; do not overwrite them. FMG is the evidence and market-intelligence producer; Flower 2.0 is the candidate-construction, risk-checking, trade-proposal and reconciliation engine. User retains final live-order authority. Do not confuse this research file with executable code or a deployed strategy.

## User requirements and limitations
- Aim for gross maximum expiration profit >= US$500; hard gross maximum expiration loss <= US$300 **across all possible settlement prices**.
- Maximize the profitable settlement region; originally sought about XSP 752–764 around illustrative reference 758.
- Research calculations intentionally exclude commissions and fees at user's direction; for live proposals disclose actual execution costs separately, plus slippage, liquidity, and margin.
- Defined-risk positions only; no naked calls. IBKR combination order constraints may require splitting orders; split fills introduce legging risk.
- Minimal monitoring and a decision within a realistic trading window, not end-of-day hindsight. No-trade is valid when constraints fail, but direction UNCLEAR alone should not prevent evaluation of a neutral structure.
- XSP option multiplier 100; SPX/XSP levels differ by about 10:1, but contract dollar exposure is not identical. Verify contract specifications, expiry, settlement and market data.
- Quotes used in earlier research were sequential snapshots on Nov 2, 2026, NOT synchronized guaranteed executable combo prices. Never treat as current quotes.

## V3.0 benchmark: mixed-width iron condors
Illustrative XSP reference 758; each row quantity 1:
1. Long 751P / short 755P / short 760C / long 763C; modeled credit $190.
2. Long 755P / short 757P / short 760C / long 763C; modeled credit $185.
3. Long 755P / short 757P / short 761C / long 763C; modeled credit $127.
Total modeled credit $502. Aggregate maximum put-side wing exposure = (4+2+2)*$100=$800; call-side = (3+3+2)*$100=$800. Thus global maximum gross expiration loss = $800-$502=$298, both far tails. Maximum gross expiration profit $502 for settlement 757–760. Gross breakevens approximately 753.98 and 762.01; profitable interval ~8.03 XSP points. These are mathematical payoff results conditional on assumed credit, NOT fill or backtest results.

For settlement x, gross expiration P/L:
P(x)=502 - 100*[min(4,max(0,755-x)) + 2*min(2,max(0,757-x))] - 100*[2*min(3,max(0,x-760)) + min(2,max(0,x-761))].
Sample outcomes: x=752 -> -198; 754 -> +2; 757–760 -> +502; 761 -> +302; 762 -> +2; 763 -> -298.

## Structural exploration and provisional findings
- V3.1-A unequal-ratio candidate: 1x 755/751 put credit spread (4 wide), 1x 757/754 put credit spread (3 wide), 4x 760/762 call credit spreads (2 wide each). Previously modeled credit $502, downside max loss $198, upside max loss $298, profitable ~752.97–761.26. Better downside room but worse upside than V3.0. This is a modeled comparison, not independently verified fill.
- Other tested 2-put/3-call candidate: previously modeled $505 max credit / $295 max loss, profitable ~753.48–761.68; not a balanced improvement.
- V3.2 center iron butterfly overlay onto V3.0: modeled max profit $742, max loss $358; fails $300 cap.
- V3.2 two outer iron butterfly overlays: modeled max profit $378, max loss $422; fails both goals.
- V3.2 reverse iron butterfly overlay: modeled max profit $293, max loss $207; fails $500 profit target.
- Next research: replace component spreads rather than simply layering costly butterflies. Test mixed widths, ratios, broken wings and directional candidates against full piecewise expiration payoff.
- No evidence yet that any of these modifications improves real-world win rate.

## V3.4 direction-adaptive families
FMG must output BULL, BEAR, UNCLEAR or DATA_INCOMPLETE with evidence, timestamp and confidence.
- BULL: Flower evaluates defined-risk bull put credit spreads, with no upper expiration breakeven; profit remains capped at credit.
- BEAR: Flower evaluates defined-risk bear call credit spreads, with no lower expiration breakeven; profit remains capped at credit.
- UNCLEAR: Flower evaluates V3.0 balanced mixed-width condors and other neutral candidates.
- DATA_INCOMPLETE: bounded recovery and explicit rejection when required evidence remains stale/missing.
Removing one side of a condor also removes that side's premium. It is UNPROVEN that one-sided directional spreads can achieve >=$500 credit and <=$300 global max loss at practical bid/ask quotes. Do not invent a qualified trade.
Direction forecasts are uncertain and must be assessed on *remaining move from actual entry to settlement*, not hindsight or open-to-close movement. No directional classification is a guarantee.

## V3.5 premium integrity gate (critical)
For a fixed V3.0 structure with $800 wing exposure, max gross expiration profit = credit C, max gross expiration loss magnitude = $800-C. E.g. C=$502 -> $502/$298; C=$450 -> $450/$350; C=$400 -> $400/$400. Falling premium both reduces max profit and increases max loss, and moves breakevens inward. Premium does not necessarily decline monotonically with time; underlying price and implied volatility also matter.
Flower MUST reprice from fresh IBKR executable bid/ask or realistic combination quotes immediately before proposing/entering; check every candidate against BOTH >=$500 gross max profit and <=$300 global max loss. If it fails, redesign or reject. Never widen risk merely to force $500 credit. Capture (1) first candidate quote, (2) proposal quote, (3) actual fill; only fills determine contractual premium. Account for non-simultaneous multi-order legging risk.
FMG should collect from open; Flower may precompute candidate families in parallel, but no premature directional certainty or automated execution. The proposed 10:15 AM New York decision deadline is a DESIGN PROPOSAL, not a deployed scheduler or validated optimum; consider US DST, holidays and early closes.

## FMG -> Flower packet contract (proposed)
Versioned packet: schema_version, US_session_date, checkpoint_id, intended_checkpoint_NY, actual_collection_timestamp_UTC, underlying/reference_price, source timestamps, direction (BULL|BEAR|UNCLEAR|DATA_INCOMPLETE), confidence/calibration, supporting_and_conflicting_evidence, remaining_expected_move, volatility (e.g. VIX1D and ATM straddle if available), liquidity, freshness/completeness, safety warnings, provenance, deduplication key. Missing essential data is not equivalent to UNCLEAR.
FMG produces evidence; Flower consumes packet, validates freshness and duplicates, selects candidate family, reprices, computes full payoff, applies risk and execution gates, and publishes qualified proposal or explicit NO QUALIFYING TRADE. Human approves orders. Flower reconciles executions, fees, realized P/L, EOD/EOW and feedback to FMG.

## Reliability / governance
Preserve existing FMG :00, :30 and Watchdog schedules and Flower schedules; do not disable on GitHub write failure. Track scheduler/execution/persistence status independently. GitHub intended durable source of truth; approved fallback and retry/readback for persistence outage. Max two simultaneous calls; sequential default. Keep FMG and Flower responsibilities and chats separate. No production cutover or autonomous live trading implied.

## Validation still required
1. Verify quote timestamps, full option-chain snapshots, combo executable credits, fees and slippage.
2. Independently compute leg-level expiration payoff at all strike breakpoints and both tails; enforce global <=$300 loss.
3. Historical out-of-sample test with timestamped option quotes, direction signal known at entry, realistic fill and exits; compare BULL/BEAR/UNCLEAR selection to always-neutral V3.0 and no-trade.
4. Replay W44, test duplicate/stale/missing packets, outages, recovery, deadline adherence, and end-to-end Commence -> proposal -> EOD -> EOW.
5. Report PASS/FAIL/UNTESTED separately; no claimed win-rate uplift until verified.

## Historical research caveat
Earlier 123-session May–Oct 2026 SPX daily open-to-close movement analysis was NOT a real 0DTE options fill backtest and NOT a 10:15 entry test. A reported 111/123 (~90.2%) sessions with absolute SPX open-close movement <=60 points is not a strategy win rate. Do not extrapolate it as such.

## Discovery instruction for other chats
Search repository for exact file name **SPX_XSP_0DTE_MASTER_STRATEGY_V3_0_TO_V3_5.md** or keywords **0DTE premium integrity FMG Flower**. Read this master consolidation plus earlier dated research files before modifying or claiming implementation. Verify latest branch, commit, quote timestamp and live system status; distinguish design from deployed code.
