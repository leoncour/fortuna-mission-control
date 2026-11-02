# SPXW 0DTE Strategy Research — V0.5
Date 2026-11-02. Research only, no orders placed.

## Revised priority and acceptance test (user direction)
Reference center **7580**, central **60-point full-profit zone 7550–7610**: require **at least US$500 gross expiration profit at every settlement in this zone**.
Adjacent **20-point loss-reduction zones**: downside 7530–7550 and upside 7610–7630. Require **expiration loss no worse than 20% of the entire portfolio's global maximum expiration loss at every point inside either zone**. Outside 7530–7630, accept the structure's finite, explicitly calculated maximum loss **for this first feasibility stage**.
This is a research filter, not a declaration of acceptable account risk or an authorization to trade.

**Priority order:** (1) find a structure meeting both 60-point ≥$500 profit and two 20-point ≤20%-of-max-loss buffer zones; (2) only after feasibility, investigate break-even at ±100, max loss ≤$300, far-tail insurance, margin and fees. No restriction on number of orders, ≤6 legs per individual IBKR order, no naked calls.

**Mathematical interpretation:** Define L = maximum(0, -minimum portfolio expiration P/L across all settlements). The outer-zone condition is P/L(S) ≥ −0.2L for every S in [7530,7550] and [7610,7630]. If L=0, outer zones must be nonnegative. Since vertical-spread portfolios have continuous expiration payoff, the endpoints matter; do not model a discontinuous cliff at 7530 or 7630. Check all strike breakpoints and both tails.

## Existing V0.4 candidate A fails the buffer condition
Candidate A: short 7550P/7610C, long 7540P/7620C; frozen IBKR gross credit $560; global max expiration loss $440. Buffer limit = $88. But P/L at 7540 and 7620 is −$440, both **inside** the required 7530–7550 and 7610–7630 buffers. Therefore A is **not a qualifying solution** even though it passes the central 60-point profit test.

## Preliminary new candidate (FROZEN quotes, not live executable)
A wider-wing 30-point iron condor: buy 7520P ask 12.30, sell 7550P bid 19.10; sell 7610C bid 20.40, buy 7640C ask 11.00.
Gross credit = (19.10 − 12.30 + 20.40 − 11.00)×100 = **$1,620**.
Max loss = $3,000 − $1,620 = **$1,380**. Buffer allowance = $276.
At 7530: $1,620 − (7550−7530)×100 = **−$380**. At 7630 same −$380. Hence **fails buffer** ($380 > $276) despite full plateau profit +$1,620. At 7520/7640 and beyond −$1,380.
Conclusion: simply widening symmetric protective wings from 10 to 30 points does not automatically satisfy 20%-of-global-loss buffer.

## Next engineering experiment
Use quote-driven strike/wing optimization and optional separate debit spreads to satisfy both exact inequalities. Search piecewise-linear expiration payoffs, not just the visually attractive plateau. Optimize maximum loss and gross profit subject to buffer constraints. Clearly label any unpriced hypotheses and market-data status. Do not place orders.
