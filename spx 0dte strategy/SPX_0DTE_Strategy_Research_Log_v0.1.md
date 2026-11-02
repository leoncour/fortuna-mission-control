# SPXW 0DTE — Strategy Research Log
**Version:** 0.1 | **Recorded:** 2 November 2026 | **Status:** Research only — no orders placed

## Mission and operating constraints
Build a defined-risk SPXW 0DTE portfolio with a **continuous ~60-point central settlement zone earning at least US$500 expiration profit**, transition/loss-reduction zones of approximately 20–40 points on either side, and a goal (not a verified achievable result) of returning toward breakeven around ±100 points from entry. Measure and cap losses beyond those levels. Prefer low insurance cost. **Maximum six legs per IBKR order; number of orders is not capped. No naked calls.** Report gross entry credit, intrinsic obligations, expiration P/L, maximum loss, fees, execution risk, and margin separately. Do not place orders without express authorization.

**Earlier targets, superseded for exploration:** gross or net $500 entry credit, ±80-point positive settlement range, $300 maximum expiration loss. User later said a $610 maximum expiration loss may be acceptable if reward is compelling; this is *not* a blanket approval of higher risk. An aspirational insurance goal of reducing a $930 tail loss to $186 was also explored; no qualifying trade was found.

## Pricing and evidence limitations
IBKR SPXW 2026-11-02 options chain; snapshots obtained 2026-11-02 Singapore morning, **status FROZEN** (prior-session indicative prices). Assumed sell at bid / buy at ask, SPX $100 multiplier. Not executable quotes. Fees not verified; where shown, $2 per contract leg is an illustrative allowance only. Actual market entry, margin, early exit, slippage and multi-order fill risk unverified. A live-market repricing is mandatory before any decision.

## Benchmarks — expiration P/L before fees
| Candidate | Structure | Gross entry credit | Max expiration profit | Max expiration loss | Profit-zone observations | Status |
|---|---|---:|---:|---:|---|---|
| A | 2 iron butterflies, centers 7560 and 7600, 20-point wings | $3,390 | $1,390 | $610 | Two separated positive zones, approximately 7553.9–7573.9 and 7586.1–7606.1; **loss at 7580** | KIV: favorable peak/loss ratio, but central gap |
| B | 3 iron butterflies, centers 7560/7580/7600, 20-point wings | $5,070 | $1,070 | $930 | Full-profit plateau 7560–7600; positive approximately 7549.3–7610.7 | **PRIMARY BENCHMARK / KIV** |
| C | 4 iron butterflies, centers 7560/7580/7600/7620, 20-point wings | $6,750 | $750 | $1,250 | Full-profit plateau 7560–7620; positive roughly 7547.5–7632.5 (recheck exact boundaries) | KIV: wider, materially larger tail risk |
| D | 20-point single iron butterfly centered 7580 | $1,680 | $1,680 | $320 | Narrow peak, rapidly decays outside center | KIV: too narrow |
| E | Wide 7500/7480 put + 7660/7680 call iron condor | $450 | $450 | $1,550 | Full profit 7500–7660, but gross credit below $500 and risk too large | Rejected for present goal |

**Important:** Gross entry credit is **not** the amount retained as expiration profit. For benchmark B, $5,070 credit minus $4,000 minimum expiration intrinsic liability = $1,070 maximum profit. Fees further reduce this.

### Benchmark B — exact four-leg orders
1. Buy 7540P; sell 7560P; sell 7560C; buy 7580C.
2. Buy 7560P; sell 7580P; sell 7580C; buy 7600C.
3. Buy 7580P; sell 7600P; sell 7600C; buy 7620C.

**B expiration P/L before fees:** SPX ≤7540: −$930; 7550: +$70; 7560 through 7600: +$1,070; 7610: +$70; ≥7620: −$930. Illustrative $2/leg fee allowance across 12 legs: $24, so max profit ~$1,046, max loss ~$954.

## Insurance and reverse overlays explored
- Add 7540P/7520P put debit spread: ~$490 debit; add 7620C/7640C call debit spread: ~$640 debit. Combined $1,130 debit; **creates intermediate loss valleys** and consumes much of the core profit. Do not treat far-tail payout as protection at 7540/7620.
- Add 7560P/7540P put debit spread: ~$660 debit; add 7600C/7620C call debit spread: ~$870 debit. Total $1,530 debit. On benchmark B this produces approximately a **flat −$460 expiration payoff** before fees; rejected.
- Reverse iron butterfly centered 7580: previously evaluated as eroding the center profit and restoring two separated peaks. Recompute exact legs, premiums and combined payoff before relying on the earlier numerical comparison.
- Reverse iron condor: tested arrangement removes much of the payoff variation but also consumes all central profit. Recompute exact legs and price before reuse.
- Other outer debit-spread overlay examples are **not accepted as verified best candidates** until independently repriced and checked at every strike breakpoint.

## Target shape for next search — DESIGN GOAL, NOT A PRICED TRADE
- Central ~60-point settlement plateau: **≥$500 net expiration profit**, preferably after estimated fees.
- Adjacent 20–40-point zones: controlled deterioration and loss reduction, avoiding a deep intermediate valley.
- Near ±100 points: ideally approximately breakeven (requires additional payoff recovery, not just an ordinary credit condor).
- Outside ±100: finite, measured maximum portfolio loss. Explicitly report the worst point anywhere, including between hedges.
- No fixed number-of-orders limit; **≤6 legs in each individual order**, each independently valid. Optimize all legs jointly rather than bolt on overpriced hedges.

## Next research experiment
1. On live market day, retrieve SPX spot, 0DTE chain and live bid/ask for sufficiently broad strikes, with time stamps and liquidity.
2. Generate 2–N order portfolios of staggered unequal-width butterflies, broken-wing butterflies, iron condors and put/call debit spreads; keep ≤6 legs per order and fully defined combined risk.
3. Compute aggregate expiration P/L at every strike breakpoint and in both tails. Include fees per contract, fill/slippage assumptions, margin and order sequencing.
4. Rank by **minimum P/L across the central 60 points**, continuous positive-zone width, maximum loss, tail recovery at ±80/±100, and actual retained profit—not entry credit alone.
5. Compare against benchmarks A/B/C. Show no qualifying candidate if none exists. No trading without explicit approval.

## Historical movement context (not a strategy backtest)
Earlier IBKR daily SPX OHLC sample: 25 sessions (2026-09-28 to 2026-10-30); mean high-low about 61 points and mean absolute open-close about 27 points. **Data quality warning:** 2026-09-30 bar has reported close below reported low; verify before rigorous backtesting. Open-close movement is not the same as entry-to-expiration movement; no win probabilities or historical options returns have been established.

## Decision log
- Keep benchmark B as pocket/KIV option; A and C retained for comparison.
- Prioritize wide, continuous profit plateau over narrow high payout peaks.
- Reject insurance that destroys all profit or leaves deeper intermediate losses.
- The user accepts exploring losses above the original $300 target, but any proposed maximum loss requires explicit review.
- All work remains research only.
