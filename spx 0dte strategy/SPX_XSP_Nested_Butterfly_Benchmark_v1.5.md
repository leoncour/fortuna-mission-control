# XSP Nested Iron Butterfly Benchmark V1.5
Date 2026-11-02. Research only, no orders. XSP Nov 2 expiry. Each long iron butterfly: buy lower put ask, sell center put bid, sell center call bid, buy upper call ask; multiplier $100. Center 758. Sequential IBKR snapshots marked REALTIME, not synchronized, no guarantee of executable combo fills.

Common center 758P bid 1.12, 758C bid 4.60.
10-point butterfly long 748P ask .13, long 768C ask .43; gross credit (1.12+4.60−.13−.43)*100=$516, global max expiration loss $484, P/L at 753 or 763 +$16, breakevens 752.84/763.16.
8-point butterfly long 750P ask .20, long 766C ask .77; gross credit $475, global max expiration loss $325, P/L at 753/763 −$25.
6-point butterfly long 752P ask .32, long 764C ask 1.33; gross credit $407, global max expiration loss $193, P/L at 753/763 −$93.

10+8 combined: peak $991, global max expiration loss (10+8)*100−991=$809, P/L at 753/763 =991−2*500=−$9; positive-profit range centered at 758, ±4.955 points.
10+8+6 combined: peak $1398, global max expiration loss (10+8+6)*100−1398=$1002; at 753/763 $1398−3*500=−$102; positive-profit region narrower than 10+8.

The same-center nested butterfly raises center credit but does not flatten the payoff or expand coverage. Compare future candidates against full payoff curve, including minimum profit across ±4–5 XSP points, average partial wins/losses, worst-case, and fees. Alternative: stagger butterfly centers and/or add a condor, subject to no trades without explicit authorization.
