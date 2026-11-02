# SPXW 0DTE Strategy Research — V0.8
Date: 2026-11-02. Historical movement assessment of V0.7. Research only, no orders.

## Historical data source
IBKR SPX index contract 416904, CBOE, SIX_MONTHS, ONE_DAY, regular-hours daily OHLC. 123 rows returned, **122 usable** after excluding 2026-09-30: reported close 7651.54 below reported low 7652.90 (internally inconsistent). Dates roughly May–Oct 2026. This is a retrospective sample, NOT a calibrated forecast.

## Correct geometry
V0.7 F1: buy 7500P, sell 7550P, sell 7610C, buy 7660C, centered 7580.
- +$2,360 for 7550–7610 = **±30 points**.
- +$360 at 7530 and 7630 = **±50 points**.
- Breakevens 7526.40/7633.60 = **±53.60 points**.
- Maximum loss −$2,640 for SPX ≤7500 or ≥7660 = **±80 points or more**.
- User's '100-point protected zone' refers to **100 points total width**, not ±100 points. Distinguish this from a 100-point daily move.

## Observed SPX daily movement frequencies (122 usable sessions)
- Absolute regular-hours open-to-close movement >50 points: **21/122 = 17.2%**; ≤50: **101/122 = 82.8%**.
- Absolute open-to-close >100: **5/122 = 4.1%**; ≤100: **117/122 = 95.9%**.
- Intraday high-to-low range >100: **13/122 = 10.7%**.
- Latest 25 valid sessions: >50 open-close **4/25 = 16%**, >100 open-close **0/25**, >100 intraday range **2/25 = 8%**.
- These are descriptive frequencies, not probabilities for a particular entry time.

## Mechanical counterfactual, NOT an options backtest
For each historical day, pretend a fresh V0.7 F1 condor was centered exactly on that day's regular-session open, always filled for **$2,360 gross credit**, held to closing settlement. Payoff formula for daily open-close displacement d:
P/L = 2360 − 100 × min(50, max(0, abs(d)−30)).
Across 122 usable daily bars:
- 106/122 = **86.9%** hypothetical profitable expiration outcomes.
- 16/122 = **13.1%** hypothetical losing outcomes.
- 67/122 = **54.9%** full $2,360 plateau outcomes.
- 8/122 = **6.6%** full −$2,640 max-loss outcomes.
- Mechanical mean P/L **+$1,477.88 per session** BEFORE fees, slippage, execution and margin. **Do not treat as a plausible expected profit or projected daily income**: constant option credit is not historically validated and varies strongly with volatility, time-to-expiry, spot and skew; entry at daily open is assumed; exercise/settlement details, path risk and liquidation ignored. The mean is highly likely misleading as an economic performance estimate.

## Critical gaps before any trading decision
1. Obtain actual historical 0DTE option bid/ask quotes at a consistent entry time for each session; rebuild dynamic strike selection and reprice all four legs day by day.
2. Align each daily entry time with the correct SPXW settlement and option expiration (daily OHLC open/close alone insufficient).
3. Model stop/exit, intra-day margin, possible liquidation and order fills, not just expiration.
4. Assess sample uncertainty, volatility regimes, macro-event days and extreme-tail moves. Six months is a small, regime-dependent sample.
5. Determine the true empirical likelihood of settlement outside ±50/±53.6/±80 **from the intended actual entry time**, not regular-hours open.

## Decision
V0.7 passes gross payoff geometry and is worth further validation, but **not certified** as a profitable trading strategy. Retain V0.1–V0.7. No orders placed.
