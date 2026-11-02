# XSP 0DTE Butterfly versus Condor Research V1.4
Date: 2026-11-02. Research only; no order authorization.

Objective: remove limits on number of butterflies and condors; target gross peak credit >=$500, preferably 8–10 XSP points of positive expiration payoff, and lower maximum loss than XSP V1.2's $694. Distinguish full-credit plateau from merely profitable range.

**One XSP iron butterfly candidate, Nov 2 2026:** buy 748P ask .14; sell 758P bid 1.17; sell 758C bid 4.67; buy 768C ask .45. Sequential IBKR quote snapshots; underlying index snapshot 758.1 status FROZEN. Not synchronized or guaranteed executable. Four legs.

Gross credit (1.17+4.67−.14−.45)*100 = **$525**. At expiration XSP=758 gross profit $525; at XSP=755 or 761 profit $225; at XSP=753 or 763 profit $25. Breakevens 752.75 and 763.25: positive-profit width 10.5 points. Maximum expiration loss $1000−$525 = **$475**, at settlement <=748 or >=768. Full $525 profit is achieved only at exactly 758, not across 8–10 points.

V1.2 benchmark: 2 XSP condors long 749P, short 755P, short 761C, long 767C, total credit $506, global max expiration loss $694, full-profit plateau 755–761 (6 points), buffer endpoint XSP 753 or 763 +$106.

Comparative tradeoff: butterfly has $19 greater peak credit and $219 smaller global max loss, plus 10.5-point positive-payoff width, but narrower region where gross profit is at least $500 and lower profit away from center. Does not meet a target of $500 profit throughout 8–10-point interval. One butterfly suffices to reach $500 peak credit in this quote snapshot; 3 butterflies are not intrinsically required.

Next: evaluate 1 butterfly plus 1 condor, 2 or 3 staggered butterflies, nonidentical condors and overlays. Optimize minimum payoff across 8–10-point center zone, global max loss, positive-profit width, and historical settlement probability using synchronized quotes and true settlement data. Do not claim optimality or actual win rate. No trades placed.
