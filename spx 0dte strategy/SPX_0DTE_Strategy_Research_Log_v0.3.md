# SPXW 0DTE Strategy Research — V0.3
Date: 2026-11-02. Status: Research only; no orders placed. Companion to V0.1 and V0.2 in this folder.

## Major finding: three staggered butterflies reduce to a four-leg iron condor at expiration
The three 20-point-wing iron butterflies centered at 7560, 7580 and 7600 have an expiration intrinsic payoff identical to a single iron condor with long 7540P, short 7560P, short 7600C, long 7620C. Redundant options cancel algebraically. **Their quoted entry costs differ**, so P/L levels differ.

IBKR SPXW 2026-11-02 **FROZEN** bid/ask snapshot, $100 multiplier, short at bid / long at ask, before commissions:

- Direct condor: buy 7540P ask 16.80; sell 7560P bid 22.30; sell 7600C bid 24.70; buy 7620C ask 17.10.
- Credit = (22.30 - 16.80 + 24.70 - 17.10) × 100 = **$1,310**.
- Width on each side = 20 × $100 = $2,000.
- Maximum expiration profit = **$1,310** if SPX settles 7560–7600 inclusive.
- Maximum expiration loss = $2,000 - $1,310 = **$690**, for SPX ≤7540 or ≥7620.
- Breakevens: **7546.90** and **7613.10**.
- Three butterflies: gross credit $5,070; minimum intrinsic liability $4,000; max profit $1,070; max loss $930. Direct condor has **$240 higher peak profit and $240 lower maximum loss** at these indicative bid/ask prices, using four legs instead of twelve.

## Adding the direct condor on top of the three butterflies
- Combined gross entry credit = $5,070 + $1,310 = **$6,380**.
- Combined maximum expiration profit = $1,070 + $1,310 = **$2,380** over 7560–7600.
- Combined maximum expiration loss = $930 + $690 = **$1,620** outside 7540–7620.
- **Conclusion:** doubles down on same payoff shape; does not insure outside edges. KIV only, not preferred for risk control.

## Candidate for next experiment: wider central condor
Two different modifications:
1. **Move short strikes farther apart** to make a wider full-profit plateau, ideally ~60 points; retain narrow defined-risk wings to avoid excessively large losses.
2. **Move long protective wings farther apart**, which can increase collected credit but also expands max loss; do not conflate this with widening the full-profit plateau.

Initial proposed comparisons, **not yet priced/verified**:
- 7550P short / 7610C short, 10-point wings (long 7540P, long 7620C): 60-point full-profit plateau.
- 7550P short / 7610C short, 20-point wings (long 7530P, long 7630C): 60-point full-profit plateau.
- 7540P short / 7620C short, 10-point wings (long 7530P, long 7630C): 80-point full-profit plateau.
- Compare with original direct condor short 7560P/7600C, long 7540P/7620C: 40-point plateau.

### Explicit target and acceptance
User wants >=$500 actual expiration profit throughout approximately 60-point central settlement zone, controlled 20–40-point outer protection zones, ideally recover toward breakeven around ±100 points, finite measured maximum loss; max 6 legs **per order**, number of orders unrestricted, no naked calls. Check every strike breakpoint, worst intermediate valley, fees, margin, fill sequence and live bid/ask. An ordinary credit condor **cannot recover toward breakeven after reaching its flat maximum-loss tail**; a separate directional debit spread or different construction is needed for that aspiration.

### Data status
All numerical results here are mathematical expiration calculations using previously retrieved IBKR **FROZEN** quotes. Not current executable prices, not a probability forecast, and not a recommendation to place a 0DTE trade. Fees excluded. The wider-condor candidates are hypotheses, not yet priced.
