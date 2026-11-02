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

---

## Source-linked research registry — 2026-11-02 audit
**Scope:** All thirteen earlier strategy files V0.1–V0.9 and V1.1–V1.4 were inspected from GitHub main. The V3.0–V3.5 content above was consolidated from the present strategy discussion; no separately committed V3.0–V3.5 experimental source files were found during this audit. Accordingly, V3 results are **conversation-derived modeled research**, not independently corroborated by the V0/V1 files. Do not label them verified market fills.

**Citation convention:** [R01]–[R13] refer to the immutable historical research *filenames* below, relative to the `spx 0dte strategy/` directory. Links point to GitHub main; for reproducibility record a commit SHA when citing a result in any new experiment. **[M]** means the V3 conversation-derived master analysis, not an independent external research file.

### Primary source register
| ID | File (click to open) | Scope |
|---|---|---|
| R01 | [SPX_0DTE_Strategy_Research_Log_v0.1.md](SPX_0DTE_Strategy_Research_Log_v0.1.md) | Initial staggered SPX butterfly targets and frozen-price baselines |
| R02 | [SPX_0DTE_Strategy_Research_Log_v0.2.md](SPX_0DTE_Strategy_Research_Log_v0.2.md) | Far-out debit insurance and intermediate loss valleys |
| R03 | [SPX_0DTE_Strategy_Research_Log_v0.3.md](SPX_0DTE_Strategy_Research_Log_v0.3.md) | Three staggered butterflies versus direct iron condor |
| R04 | [SPX_0DTE_Strategy_Research_Log_v0.4.md](SPX_0DTE_Strategy_Research_Log_v0.4.md) | Short-strike spacing versus wing-width comparison |
| R05 | [SPX_0DTE_Strategy_Research_Log_v0.5.md](SPX_0DTE_Strategy_Research_Log_v0.5.md) | Early 20%-of-tail-loss buffer rule, later superseded |
| R06 | [SPX_0DTE_Strategy_Research_Log_v0.6.md](SPX_0DTE_Strategy_Research_Log_v0.6.md) | Revised ±20-point buffer targets and $300 preference |
| R07 | [SPX_0DTE_Strategy_Research_Log_v0.7.md](SPX_0DTE_Strategy_Research_Log_v0.7.md) | Wide-wing SPX feasibility with large tail losses |
| R08 | [SPX_0DTE_Strategy_Research_Log_v0.8.md](SPX_0DTE_Strategy_Research_Log_v0.8.md) | 122 usable daily OHLC observations and mechanical counterfactual |
| R09 | [SPX_0DTE_Strategy_Research_Log_v0.9.md](SPX_0DTE_Strategy_Research_Log_v0.9.md) | 22-session 10:30 NY-to-close movement sample; no same-day option quotes |
| R10 | [SPX_XSP_Comparison_Research_v1.1.md](SPX_XSP_Comparison_Research_v1.1.md) | XSP/SPX contract sizing, strike increments, condor examples |
| R11 | [SPX_XSP_Width_Sizing_Research_v1.2.md](SPX_XSP_Width_Sizing_Research_v1.2.md) | Two identical XSP condors, restricted wing grid |
| R12 | [SPX_XSP_Wider_Profit_Zone_Research_v1.3.md](SPX_XSP_Wider_Profit_Zone_Research_v1.3.md) | Restricted widened-plateau grid with zero qualifying combinations |
| R13 | [SPX_XSP_Butterfly_Condor_Research_v1.4.md](SPX_XSP_Butterfly_Condor_Research_v1.4.md) | XSP iron butterfly peak versus plateau and global loss |
| M | This master file, sections V3.0–V3.5 above | Conversation-derived V3 payoff models, directional design and operational requirements |

### Finding ledger (evidence and decision impact)
| Finding ID | Claim and numerical evidence | Source | Evidence class | Decision consequence |
|---|---|---|---|---|
| F01 | Three adjacent 20-point SPX iron butterflies have the same intrinsic expiration payoff shape as a direct four-leg iron condor; frozen quoted direct condor $1,310 credit / $690 max loss versus three flies $1,070 max profit / $930 max loss | R01, R03 | Algebraic payoff equivalence; frozen indicative pricing | Simplify and net redundant legs; compare executable order prices, do not assume the historical $240 advantage persists |
| F02 | Far-out debit insurance on three flies reduced plateau $1,070→$490 and worsened intermediate maximum loss $930→$1,510, despite recovering far tails | R01, R02 | Modeled payoff using frozen quotes | Check ALL strike breakpoints; never judge protection by far-tail payoff alone |
| F03 | SPX 60-point plateau, 10-point-wing candidate $560 max profit / $440 max loss; 80-point plateau candidate $470 max profit / $530 max loss | R04 | Modeled payoff using frozen quotes | Short-strike spacing expands plateau; long-wing width governs risk, distinct optimization levers |
| F04 | A 30-point-wing SPX condor yielded $1,620 credit, $1,380 max loss, and −$380 at buffer endpoints; fails its earlier buffer requirement | R05, R06 | Modeled payoff | Bigger credit can coexist with worse tail and buffer losses |
| F05 | Wide 50-point-wing SPX F1: $2,360 plateau and +$360 at ±50 SPX points, but −$2,640 tail loss; F2 max tail loss $2,970 | R07 | Modeled payoff; frozen prices | Passing central/buffer criteria does NOT meet present $300 global-loss cap |
| F06 | 122 usable daily bars: 101/122 (82.8%) open-close moves ≤50; 117/122 (95.9%) ≤100; excluded one internally inconsistent bar | R08 | Descriptive historical index bars, not options results | Use only as historical movement context; verify data quality and regime |
| F07 | 22 October sessions at 10:30 NY proxy: 21/22 (95.45%) entry-to-close moves ≤50; 15/22 (68.18%) ≤30 | R09 | Small retrospective index-movement sample | Prioritize testing actual 10:30 entry; not a forward win rate or optimized time |
| F08 | October 26–30 historical option bars were for Nov 2 expiry, not same-day 0DTE; 0DTE premium backtest unavailable | R09 | Explicit data gap | Do not calculate strategy win rates or expected profits from frozen credit |
| F09 | XSP 5-point-wing single condor modeled $228 credit / $272 loss; XSP 4-point $196 / $204; SPX/XSP exposure scaling and strike-grid differences matter | R10 | Indicative sequential quotes | XSP improves sizing granularity but one contract did not reach $500 target |
| F10 | Two identical XSP 6-point condors modeled $506 credit / $694 max loss; 5-point two-condor $456 / $544 | R11 | Restricted strike-grid calculation | Neither meets BOTH current $500 credit and $300 global-loss limits |
| F11 | Restricted two-identical-condor search found no plateau >6 points with ≥$500 credit and ≤$694 max loss | R12 | Restricted grid negative result | Does not prove impossibility; search mixed widths/ratios and wider chains |
| F12 | Single XSP 10-point-wing iron butterfly modeled $525 peak profit, $475 max loss, breakevens 752.75–763.25; $525 attained only at center | R13 | Indicative payoff | Distinguish positive-profit range from full-profit plateau; fails current $300 cap |
| F13 | V3.0 three mixed-width XSP condors: modeled $502 peak profit / $298 global loss, breakevens ~753.98–762.01 | M | Conversation-derived mathematical model, unverified executable credit | Provisional neutral benchmark; independent quote and payoff verification required |
| F14 | V3.1-A unequal ratios: modeled $502 peak / $298 upside tail loss / $198 downside tail loss; V3.2 overlays fail at least one current target | M | Conversation-derived modeled comparisons | Keep as alternatives, not validated improvement or historical winner |
| F15 | BULL→bull put credit, BEAR→bear call credit, UNCLEAR→neutral condor; one-sided spreads lose opposite-side premium | M | Strategy design, untested signal performance | FMG provides evidence; Flower constructs/reprices and may reject all candidates |
| F16 | V3.0 fixed $800 wing exposure: credit $502 gives $298 tail loss; $450 gives $350 tail loss | M | Mathematical identity for fixed structure | Mandatory live premium-integrity gate; never rely on stale candidate quote |
| F17 | Proposed 10:15 NY decision deadline, early candidate quote monitoring, packet schema and independent scheduler/persistence | M | Architecture proposal, NOT implemented | Validate timing and data availability before any production cutover |

### Critical reconciliation / historical target changes
- **Do not mix superseded historical criteria with current requirements.** R01–R07 explored broader tail-loss tolerance and earlier buffer rules. The current research target in this master is ≥$500 gross maximum expiration profit AND ≤$300 global maximum expiration loss. Historical first-stage PASS is not a current PASS.
- **Data-denominator discrepancy:** R08 explicitly excluded 2026-09-30 and used **122** usable bars from 123. The older [M] note of 111/123 within ±60 is a separate, not reconciled summary and should **NOT** be used for a statistical decision until rederived with the same exclusion, timestamp convention and dataset.
- **Quote provenance:** R01–R09 SPX examples generally use FROZEN indicative quotes; R10–R13 XSP examples use sequential, not synchronized quotes, even where market-data status was REALTIME. None is an actual combo fill.
- **Profit vs credit:** R01/R03 staggered butterflies can carry intrinsic liabilities even in the best settlement zone; raw gross entry credit is NOT always expiration maximum profit. For V3.0 plain condors with disjoint short put/call strikes, central max profit equals entry credit. Compute intrinsic obligations per portfolio rather than assume equivalence.
- **Risk definition:** $300 global maximum *expiration* loss does not eliminate intraday mark-to-market loss, liquidation, exercise/settlement, slippage or partial-fill risk. Live trade gating must separately account for these.
- **Source status:** All historical filenames are evidence snapshots, not current instructions to trade. Later revisions supersede goals only where explicitly recorded; never retroactively alter original files.

## Mandatory research lifecycle for all future chats / agents
**Step 0 — READ MASTER FIRST.** Search exact `SPX_XSP_0DTE_MASTER_STRATEGY_V3_0_TO_V3_5.md` in `leoncour/fortuna-mission-control` on **main**. Read this source register, finding ledger, current risk gates and latest update. Do not infer from chat memory alone.

**Step 1 — DUPLICATE CHECK.** Search finding IDs, strategy family, exact strikes/widths/ratios, payoff geometry, entry timing and research question in the master. Then read linked R## source(s). Classify proposal as:
- **EXISTING / REUSE:** same structure and assumptions; reuse with current repricing, no redundant file.
- **EXTENSION / RETEST:** same idea but different quotes, dates, risk cap, timing, sample or execution method; create a new dated experiment and explicitly link prior R##/F##.
- **NOVEL / RESEARCH:** genuinely different hypothesis; create a new standalone experiment file.
- **CONFLICT / RECONCILE:** apparent disagreement with a prior result; do not overwrite; document the exact differing assumption or calculation.

**Step 2 — RESEARCH IN SEPARATE FILE.** Use directory `spx 0dte strategy/experiments/`, naming `YYYY-MM-DD_SPX_XSP_0DTE_<TOPIC>_RNN.md` (new sequence per day; verify name unused). Required headings:
1. Question, hypothesis and relationship to existing F##/R##;
2. Exact date/time/timezone, underlying, expiration, settlement convention and instrument;
3. Raw source/provider, quote status, timestamps, bid/ask, synchronization and missingness;
4. Full legs/ratios, credits/debits, multipliers, commissions separately;
5. Expiration payoff at ALL strike breakpoints, both tails, min/max, breakevens, plateau and positive zone;
6. Liquidity, legging, margin, intraday risk, slippage, data-quality issues;
7. Historical methodology, sample size, out-of-sample test, baseline and uncertainty (if applicable);
8. Outcome PASS / FAIL / INCONCLUSIVE / UNTESTED and why; explicit distinction between algebraic verification and fill/market validation;
9. Reproducible calculations and source references; proposed next step.

**Step 3 — VALIDATE.** Recompute independently and verify against original source. Reject incomplete data or conflicting assumptions as proof of edge. A strategy passing algebraic gross payoff tests is NOT automatically an executable trade. Require real quotes, fill feasibility and risk checks.

**Step 4 — UPDATE MASTER AT SAME TIME.** Add an R## entry linking the new experiment, F## entry with concise sourced finding, status and decision consequence; update current strategy comparison and open questions if warranted. Preserve original research files; do not silently rewrite old conclusions. Add a changelog line with date, new file, new IDs and GitHub commit/readback. For any superseded conclusion, mark **SUPERSEDED BY F##**, never delete the old record.

**Step 5 — VERIFY GITHUB.** Commit on intended branch, read back both new experiment and master, record exact commit SHA and whether present on main. If write fails, report persistence HOLD and retry safely; NEVER claim saved before readback. Avoid duplicate commits and concurrent writes to same file. Do not change schedulers or authorize trades as part of research-document updates.

### Decision engine: priority of evidence
1. Actual contemporaneous fill and broker reconciliation (if available).
2. Synchronized executable bid/ask and independent complete payoff calculation.
3. Timestamped historical same-day-expiring option quote backtest with realistic fills and settlement.
4. Index-only historical movement frequencies (context, not premium or win rate).
5. Sequential/frozen quotes and algebraic hypothetical models (research only).
6. Untested hypotheses (never market-performance claims).

### Next highest-value experiments (not yet performed)
- **Entry-time premium feasibility:** compare 9:45, 10:00, 10:15, 10:30 and 11:00 NY with same-day expiry option bid/ask, underlying, settlement and realized achievable payoff constraints. Count qualified opportunities, not only favorable index moves.
- **V3.0 independent repricing:** verify modeled $502/$298 using synchronized quotes, all strike breakpoints and actual order-level fill mechanics; compare against simpler netted-leg structure.
- **Directional validation:** predefine FMG signal from information available at each entry, then out-of-sample compare directional V3.4, always-neutral V3.0 and no-trade.
- **Execution reliability:** IBKR ≤6 legs per order, multi-order partial-fill risk, margin, stale packet detection and independent scheduler/persistence recovery.

## Master update log
- 2026-11-02: Added source-linked R01–R13 research register, F01–F17 finding ledger, reconciliation notes, mandatory master-first lifecycle and experiment template. Prior V3 research retained unchanged above. Documentation only; no engine implementation, scheduler change or order.
