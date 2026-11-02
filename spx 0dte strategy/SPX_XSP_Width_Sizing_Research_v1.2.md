# XSP 0DTE wing-width and sizing comparison V1.2
2026-11-02. Research only, no orders.

Goal: gross expiration maximum profit at least $500 total, central XSP 755–761, buffer XSP 753–755 and 761–763 preferably no worse than −$300, minimize global maximum expiration loss. Compare two identical XSP contracts and wider wings. $100 multiplier, bid on shorts/ask on longs, no fees. IBKR snapshots marked REALTIME at retrieval but sequential, not synchronized executable combo fills.

Short 755P bid .63 and short 761C bid 2.71. Long put asks: 745 .08, 748 .14, 749 .18, 750 .23, 751 .28, 752 .35, 753 .43, 754 .54. Long call asks: 765 1.10, 766 .83, 767 .63, 768 .45, 769 .36, 770 .26.

Two identical 5-point wing condors: buy 750P .23, sell 755P .63, sell 761C 2.71, buy 766C .83. Credit per contract $228; two contracts total +$456, global maximum expiration loss −$544; buffer endpoint P/L +$56. Does NOT meet $500 total profit threshold.

**Best max-loss among examined two-identical-contract combinations with ≥$500 gross credit: 6-point symmetric wings.** Buy 749P .18, sell 755P .63, sell 761C 2.71, buy 767C .63. Credit per contract (.63−.18+2.71−.63)×100 = $253. Two contracts credit **$506**, max loss (600−253)×2 = **$694**; buffer endpoint P/L (253−200)×2= **+$106**. Central 755–761 +$506. Breakevens XSP 752.47 and 763.53. Full-loss tails XSP ≤749 or ≥767.

Two identical 7-point symmetric wings: buy 748P .14, sell 755P .63, sell 761C 2.71, buy 768C .45. Credit per contract $275; two contracts credit $550, max loss (700−275)×2 = $850; buffer endpoints +$150.

Two identical 4-point symmetric wings: buy 751P .28, sell 755P .63, sell 761C 2.71, buy 765C 1.10. Credit $196 each, two total $392, max loss $408, buffer endpoints −$8. Fails $500 total credit threshold.

Grid evaluated long put 745,748,749,750,751,752,753,754 and long call 765,766,767,768,769,770, with fixed shorts 755P/761C. Among candidates with credit ≥$250 per contract, symmetric 6-point wings had lowest global max expiration loss $347 per contract. Grid limited and quotes asynchronous; no global optimum.

Critical risk: XSP quotes and spread fills are not guaranteed. Underlying and expiration settlement, margin, order leg execution and intraday forced liquidation not evaluated. SPX and XSP historical pricing not synchronized. More credit from wider wings does NOT necessarily reduce max loss: 6-point wings increase credit $25/contract over 5-point but increase max loss $75/contract.

Next: test mixed 5/6-point-wing contract pairing, different short strikes, and combinations of distinct condors to reach $500 gross with less than $694 maximum expiration loss while preserving central and buffer payoff. No trade authorization.
