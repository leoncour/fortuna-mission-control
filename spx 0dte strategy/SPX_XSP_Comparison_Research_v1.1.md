# SPX versus XSP 0DTE comparison — V1.1
Date 2026-11-02. Research only, no orders.

SPX and XSP index levels differ by approximately factor 10; both option multipliers $100. One equivalent XSP position has approximately one-tenth dollar exposure of SPX, not one-fifth. XSP Nov 2 chain around 740–780 displayed 1-point strike increments; no 750.5 or 765.5 strikes in retrieved chain.

IBKR XSP Nov 2 2026 option quotes, status REALTIME at retrieval, bid/ask:
750P 0.19/0.23, 751P 0.24/0.28, 755P 0.63/0.70, 761C 2.71/2.82, 765C 1.02/1.10, 766C 0.79/0.83. These quotes are not time-synchronized with earlier frozen SPX research prices; may move rapidly. No execution assumed.

XSP 5-point wing candidate: long 750P ask .23, short 755P bid .63, short 761C bid 2.71, long 766C ask .83. Gross credit (.63−.23+2.71−.83)*100 = $228. Global max expiration loss $500−$228=$272. Full-profit plateau XSP 755–761 (equivalent SPX 7550–7610). At XSP 753 or 763: $228−$200=+$28. Breakevens 752.72 and 763.28. Max loss beyond 750/766.

XSP 4-point wing candidate: long 751P ask .28, short 755P bid .63, short 761C bid 2.71, long 765C ask 1.10. Gross credit (.63−.28+2.71−1.10)*100 = $196. Max expiration loss $400−$196=$204. At XSP 753 or 763: −$4. Breakevens 753.04 and 762.96. Full loss beyond 751/765.

SPX V0.7 frozen benchmark: credit $2360, max loss $2640, buffer +$360, 50-point wings. Ideal one-tenth scaling would yield $236 credit/$264 max loss. Observed XSP 5-point wings $228/$272, but NON-SYNCHRONOUS quote comparisons do not establish an execution disadvantage.

SPX V1.0 frozen benchmark: credit $2200, max loss $2300, buffer +$200, 45-point wings. Ideal one-tenth scaling would yield $220 credit/$230 max loss, but 4.5-point XSP wings unavailable in retrieved 1-point grid; compare 4-point and 5-point approximations, not direct replicas.

Risk comparison: 1 XSP five-point condor reduces dollar risk vs 1 SPX 50-point condor about 10x. Ten XSP condors would have $2280 total credit and $2720 max loss, close to 1 SPX but higher aggregate order/fee complexity and potentially different fills. XSP 4-point condor offers $204 maximum loss per combination, at expense of smaller buffer and narrower profitable range. To obtain at least $500 central gross credit, 3 XSP five-point condors give $684 credit and $816 max loss, while 3 four-point condors give $588 credit and $612 max loss. If user requires the $500 gross floor per position, one XSP contract does not meet it.

Next: synchronize SPX and XSP quotes at same market time; evaluate bid/ask, spread liquidity, fees and sizing, actual settlement; no trade approval.
