# XSP 0DTE widened plateau research V1.3
Date 2026-11-02. Research only. No orders.

Benchmark V1.2: two identical XSP Nov 2 condors, buy 749P, sell 755P, sell 761C, buy 767C. Gross credit $506, maximum expiration loss $694, full-profit plateau XSP 755–761 (6 points), buffer boundary P/L +$106. Quotes are sequential IBKR snapshots marked REALTIME, not guaranteed executable simultaneous fills.

Objective: widen plateau beyond 6 XSP points, keep two-contract gross credit ≥$500 and global max expiration loss ≤$694. Fixed 2 identical 4-leg condors.

Tested short puts 755,756,757,759,760; short calls 761,762,763,764; long puts 748,749,750,751,752,753,754; long calls 765,766,767,768,769,770. Only valid put and call wing configurations were evaluated.

Observed short bids: 755P .63,756P .80,757P 1.00,759P 1.53,760P 1.87; call bids 761C 2.71,762C 2.09,763C 1.64,764C 1.30. Observed long put asks: 748P .14,749P .18,750P .23,751P .28,752P .35,753P .43,754P .54. Observed long call asks: 765C 1.10,766C .83,767C .63,768C .45,769C .36,770C .26.

For each candidate credit per condor = (short put bid + short call bid − long put ask − long call ask)*$100. Maximum expiration loss per condor = max(put wing width, call wing width)*$100 − credit. Two-contract values double.

Result: ZERO qualifying combinations in this restricted grid for plateau >6, two-contract credit ≥$500 and two-contract maximum loss ≤$694. No claim of global impossibility. Other short strikes, alternative expiries, multi-condor overlays, different sizes, or quotes may yield candidates. Fees, execution and actual settlement unverified.

Next: seek distinct-contract mixtures, asymmetric wings and non-identical short strikes; compare widened-zone tradeoffs even if near misses, and verify synchronized pricing before any trading.
