# SPXW 0DTE Strategy Research — V0.9
Date 2026-11-02. Research only, no orders placed.

## Selected entry time
10:30 a.m. New York. IBKR SPX index historical bars, ONE_MONTH, THIRTY_MINS, regular session only, covering 2026-10-01 through 2026-10-30 (286 bars). For each of 22 sessions, 10:30 a.m. entry proxy is open of 14:30 UTC bar; 4 p.m. close proxy is close of 19:30 UTC bar. October is EDT. These index close values are NOT verified exact SPXW PM expiration settlement values.

## Verified October 2026 displacement results
N = 22.
Within ±30 points: 15/22 = 68.18%.
Within ±50 points: 21/22 = 95.45%.
Within ±53.6 points: 21/22 = 95.45%.
Beyond ±80 points: 0/22.
Mean absolute 10:30-to-close movement: 22.1064 points.
Only session beyond ±53.6: October 16, entry 7734.46, close 7658.74, displacement −75.72.
October 30: entry 7604.73, close 7580.95, displacement −23.78.
Small, regime-dependent sample: these are retrospective frequencies, NOT forward probabilities.

## Benchmark payoff from V0.7
Long 7500P, short 7550P, short 7610C, long 7660C, centered 7580. Frozen bid/ask hypothetical credit $2360, max loss $2640, full-profit ±30, breakevens ±53.6, full loss beyond ±80. These are fixed strikes for a particular underlying level, NOT the correct historical strikes for all days. Any true historical test must recenter strikes and reprice all legs at each day's 10:30 entry.

## Historical option pricing investigation
IBKR historical option price bars were retrieved for the 2026-11-02 7500P contract, ONE_WEEK / THIRTY_MINS: 69 bars October 26–30. However these are historical prices for the **Nov 2 expiration contract**, NOT the October 26–30 **same-day-expiring** 0DTE contracts. They cannot price each historical day's four-leg 0DTE entry. The available option chain tool gives structure for a selected expiration, not a multi-day historical 0DTE quote archive. Historical synchronized bid/ask for four expiring legs at 10:30 and exact expiration settlement were not obtained. **Historical option premium feasibility: UNVERIFIED. Historical trade P/L: NOT CALCULABLE FROM AVAILABLE EVIDENCE.** Do not reuse $2360 as an assumed historical daily credit.

## Verdict and next steps
10:30 is a promising candidate time for further study, not certified optimal. Need historical same-day SPXW option bid/ask (or trade) at 10:30 for each day, contemporaneous spot, actual PM settlement, and dynamic strike selection. Expand to at least 6–12 months and compare times, market volatility regimes, macro event days. Include intraday margin and forced-close risk even for an intended hold-to-expiry position. No trade approval.
