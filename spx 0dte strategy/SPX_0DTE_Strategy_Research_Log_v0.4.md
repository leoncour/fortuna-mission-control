# SPXW 0DTE Strategy Research — V0.4
Date: 2026-11-02. Status: calculated comparison using **previously obtained FROZEN IBKR SPXW 2026-11-02 quotes**; not executable. Before commissions and slippage. $100 multiplier. No orders placed.

## Experiment: widen the full-profit plateau, not necessarily the protective wings
Credit iron condor: long lower put, short higher put, short lower call, long higher call. Credit = (short put bid − long put ask + short call bid − long call ask) × 100. Max expiration loss = (wing width × 100) − credit for symmetric wings. Full-profit plateau lies between short strikes.

| Candidate | Long put | Short put | Short call | Long call | Plateau width | Credit/max profit | Max loss | Expiration breakevens |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Prior benchmark | 7540 | 7560 | 7600 | 7620 | 40 | $1,310 | $690 | 7546.90–7613.10 |
| **A — 60-point narrow wings** | 7540 | 7550 | 7610 | 7620 | 60 | **$560** | **$440** | **7544.40–7615.60** |
| B — 60-point wide wings | 7530 | 7550 | 7610 | 7630 | 60 | $1,130 | $870 | 7538.70–7621.30 |
| C — 80-point narrow wings | 7530 | 7540 | 7620 | 7630 | 80 | $470 | $530 | 7535.30–7624.70 |

### Quote arithmetic, all indicative FROZEN
A: (7550P bid 19.10 − 7540P ask 16.80 + 7610C bid 20.40 − 7620C ask 17.10) × 100 = **$560**; width 10 ×100 = $1,000; max loss = $440.
B: (7550P bid 19.10 − 7530P ask 14.40 + 7610C bid 20.40 − 7630C ask 13.80) × 100 = **$1,130**; width 20 ×100 = $2,000; max loss = $870.
C: (7540P bid 16.30 − 7530P ask 14.40 + 7620C bid 16.60 − 7630C ask 13.80) × 100 = **$470**; width 10 ×100 = $1,000; max loss = $530.

### Findings
- A meets the **$500 gross expiration profit** threshold across the full 60-point plateau, with $440 max expiration loss, but has only **$60** room for commissions and hedges before dropping below $500. Net profit after actual fees **not verified**.
- B gives more central profit but has a higher max loss ($870). C's 80-point plateau fails the $500 gross-profit threshold.
- Standard condors flatten at maximum loss beyond the long wings; they do not recover at ±100 points. If tail recovery is necessary, add **separately optimized directional debit spreads** and recompute all intermediate losses. Avoid hedges that consume the plateau profit or create a worse loss valley.
- This is not a backtest or probability estimate. Live quotes, actual fees, intraday risk, margin and fill execution must be checked before any trade.

## Next test
Compare candidate A against nearby short strikes (e.g. 7545/7615, 7555/7605) and 5/10/15-point wings using actual available option strikes; rank by minimum central 60-point P/L after fees, max loss and outer debit-spread hedge cost. Keep all V0.1–V0.3 benchmarks KIV.
