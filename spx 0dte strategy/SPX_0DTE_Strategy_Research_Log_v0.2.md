# SPXW 0DTE Strategy Research — V0.2
Date: 2026-11-02. Research only. No orders placed.

## Relationship to V0.1
Companion test note to `spx 0dte strategy/SPX_0DTE_Strategy_Research_Log_v0.1.md`. V0.1 benchmarks remain KIV. This is not a live execution recommendation.

## Test: inexpensive far-out debit-spread insurance
Source: IBKR SPXW 2026-11-02 bid/ask snapshots, **FROZEN**, not live/executable. Sell at bid, buy at ask. SPX multiplier $100. Figures before commissions.

- Put insurance: buy 7500P at 9.00; sell 7480P at 6.20: $280 debit.
- Call insurance: buy 7660C at 6.90; sell 7680C at 3.90: $300 debit.
- Total $580 debit, 4 additional legs in two orders. Each debit spread has $2,000 maximum intrinsic payout at expiration.

### Results (before fees)
| Portfolio | Central plateau P/L | Worst expiration loss | P/L in far tails |
|---|---:|---:|---:|
| Three 20-point iron flies centered 7560/7580/7600 | +$1,070 (7560–7600) | −$930 | −$930 |
| Three flies plus both distant debit spreads | +$490 (7560–7600) | **−$1,510** | +$490 beyond ≤7480 or ≥7680 |
| Four 20-point iron flies centered 7560/7580/7600/7620 | +$750 (7560–7620) | −$1,250 | −$1,250 |
| Four flies plus both distant debit spreads | +$170 (7560–7620) | **−$1,830** | +$170 beyond ≤7480 or ≥7680 |

For three flies plus insurance, sampled expiration P/L: SPX 7480 +490; 7500 −1510; 7520 −1510; 7540 −1510; 7550 −510; 7560 +490; 7580 +490; 7600 +490; 7610 −510; 7620 −1510; 7640 −1510; 7660 −1510; 7680 +490.

**Conclusion:** The distant hedges produce tail recovery but worsen the intermediate loss valley and reduce central profit below the ≥$500 target. Reject as an executable candidate. Do not confuse recovery at ±100 with protection at intermediate strikes.

## Next experiment
Search **integrated unequal-wing / broken-wing staggered butterflies** and staggered near-boundary put/call spreads, evaluating every breakpoint and both tails; reject any configuration with unacceptably deep intermediate loss valleys. Reprice against LIVE market quotes at actual entry time, include fees and margin, and enforce ≤6 legs per individual IBKR order. Multiple orders are allowed, but execution sequencing and partial fills must be evaluated. No trading without explicit approval.
