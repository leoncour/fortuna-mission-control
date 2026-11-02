# XSP staggered butterfly research V1.6
Date 2026-11-02. Research only. No orders.

User-specified exact strikes, each one long iron butterfly (sell center put/call; buy put lower wing and call upper wing), XSP Nov 2 expiration:
A: 748P / 758P / 758C / 768C, 10-point wings.
B: 744P / 750P / 750C / 756C, 6-point wings.
C: 760P / 766P / 766C / 772C, 6-point wings.

Sequential IBKR snapshots marked REALTIME; NOT simultaneous executable quotes. Short bids and long asks:
A: 758P 1.14, 758C 4.58, 748P .13, 768C .43 => credit (1.14+4.58−.13−.43)*100=$516.
B: 750P .17, 750C 11.61, 744P .07, 756C 6.41 => credit $530.
C: 766P 5.12, 766C .72, 760P 1.84, 772C .14 => credit $386.
Sum opening gross credit $1432; NOT maximum profit since peaks cannot coincide. Individual max losses A $484, B $70, C $214. Combined global max expiration loss $768 below 744 or above 772; combined peak expiration profit $232 at XSP 758.

Exact combined expiration P/L by settlement:
748 −$368; 750 +$32; 754 +$32; 756 +$32; 758 +$232; 760 +$32; 762 +$32; 766 +$32; 768 −$368.
Flat +$32 zones XSP 750–756 and 760–766. Between 756–760 a central triangular +$232 peak at 758. Positive-profit range about 749.84–766.16, width 16.32 XSP points; these are gross before commissions.
At 750: A −284 + B 530 + C −214 = $32.
At 758: A 516 + B −70 + C −214 = $232.
At 766: A −284 + B −70 + C 386 = $32.

Comparison: V1.2 two condors credit $506, max expiration profit $506 across 755–761, max loss $694. Staggered butterflies offer wider positive-profit zone but much lower actual maximum profit $232 and higher max loss $768. Need optimize center spacing/width/quantity or overlays to meet ≥$500 realized expiration profit across meaningful zone, not merely gross entry credit.

Important: Three separate four-leg orders; IBKR six-leg per order limit. Combined economics are not a single 12-leg order. Fees, market fill, margin and historical win rate unverified. No trades.
