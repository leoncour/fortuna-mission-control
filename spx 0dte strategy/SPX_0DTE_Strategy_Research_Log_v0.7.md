# SPXW 0DTE Strategy Research — V0.7
Date: 2026-11-02. Research only. No orders placed.

## First-stage feasibility success — frozen-price calculation
Requirement: +$500 or more expiration P/L at every SPX settlement 7550–7610; preferred P/L ≥−$300 at every settlement in 7530–7550 and 7610–7630. No hard maximum tail loss at this first stage, but global max loss must be prominently disclosed.

All prices from previously retrieved IBKR SPXW 2026-11-02 **FROZEN** bid/ask quotes; not live executable. $100 multiplier; sell at bid, buy at ask. Commissions/slippage excluded.

### Candidate F1 — symmetric 50-point-wing condor
Buy 7500P at ask 9.00; sell 7550P at bid 19.10; sell 7610C at bid 20.40; buy 7660C at ask 6.90.
Gross credit = (19.10−9.00+20.40−6.90)×100 = **+$2,360**.
Expiration P/L:
- 7550–7610: **+$2,360** flat.
- 7530 and 7630: **+$360**; these are worst points in the specified buffers.
- Breakevens 7526.40 and 7633.60.
- SPX ≤7500 or ≥7660: **−$2,640 global maximum loss**.
- Every point in 7530–7630 remains profitable at expiration.
**First-stage PASS**, but substantial tail exposure ($2,640); not an approved trade.

### Candidate F2 — asymmetric condor, smaller put wing
Buy 7520P at ask 12.30; sell 7550P at bid 19.10; sell 7610C at bid 20.40; buy 7660C at ask 6.90.
Gross credit = (19.10−12.30+20.40−6.90)×100 = **+$2,030**.
Expiration P/L:
- 7550–7610: **+$2,030** flat.
- 7530 and 7630: **+$30** (worst specified buffer P/L).
- Downside tail SPX ≤7520: $2,030−$3,000 = **−$970**.
- Upside tail SPX ≥7660: $2,030−$5,000 = **−$2,970 global maximum loss**.
- Breakevens 7529.70 and 7630.30.
**First-stage PASS**, but highly asymmetric tail loss; not an approved trade.

### Comparison
Prior 7520P/7550P/7610C/7640C 30-point wing condor: +$1,620 plateau, −$380 at 7530/7630, max loss −$1,380; fails preferred buffer by $80.

## Critical interpretation
The initial zone criteria can be satisfied by widening protective wings and collecting more credit, but this may shift risk into much larger **outside-zone** maximum losses. A pass of the buffer criteria is NOT proof of a good risk/reward trade. At 0DTE, intraday MTM and margin/liquidation risk also matter. Quote status FROZEN means these are historical hypothetical fills.

## Next optimization
Search additional unequal widths and/or directional debit spreads to reduce F1/F2 global maximum loss while keeping at least +$500 across 7550–7610 and ≥−$300 in both buffers. Explicitly rank maximum loss first among passing candidates; report gross credit and exact expiration P/L breakpoints. Verify live quotes and fees before considering execution. Keep V0.1–V0.6 intact.
