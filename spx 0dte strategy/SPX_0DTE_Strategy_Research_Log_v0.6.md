# SPXW 0DTE Strategy Research — V0.6
Date: 2026-11-02. Research only, no orders placed.

## Revised protection-zone acceptance criteria — user clarification
Reference center 7580.
- **Main zone:** SPX expiration settlement **7550–7610**, at least **+$500 gross expiration profit** at every point.
- **Downside buffer:** **7530–7550**, preferably no worse than **−$300 expiration P/L** at any point.
- **Upside buffer:** **7610–7630**, preferably no worse than **−$300 expiration P/L** at any point.
- The former condition 'buffer loss ≤20% of global maximum expiration loss' is now **aspirational**, NOT a hard filter.
- **Slight breaches of $300 are candidates for review**, not automatic rejection; show the precise worst buffer loss and how far above $300 it is.
- **Outside 7530–7630:** show and assess finite global maximum expiration loss separately. User has not pre-authorized any particular maximum loss.
- Fees are secondary for initial feasibility; keep gross and net figures distinct. No naked calls; maximum six legs per IBKR order, unlimited number of orders. No trading authorization.

## Baseline tests under revised criteria
**V0.4 A 10-point-wing iron condor**: long 7540P, short 7550P, short 7610C, long 7620C; frozen credit $560, max loss $440. At 7530 and 7630: −$440, exceeding $300 by $140. Main-zone +$560. KIV but fails preferred buffer.

**30-point-wing condor**: long 7520P, short 7550P, short 7610C, long 7640C; frozen credit $1,620, max loss $1,380. At 7530/7630: −$380, exceeding $300 by **$80**. Main-zone +$1,620. Retain for comparison as a **near-miss**; do not claim acceptable global max loss.

## Next test
Optimize strike placement, wing width, and optional directional put/call debit spreads for (a) continuous 60-point +$500 zone, (b) worst buffer loss ≤$300 ideally, (c) global maximum loss, and (d) efficient gross profit. Rank near-misses separately. Price from clearly labeled IBKR market-data status; frozen quotes are not executable. Verify payoff at all breakpoints and tails.
