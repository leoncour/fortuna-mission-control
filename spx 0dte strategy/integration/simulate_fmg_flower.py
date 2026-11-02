#!/usr/bin/env python3
"""Offline FMG -> Flower 0DTE contract simulation. Standard library only.
No broker calls, no live orders, no scheduler changes.
Usage: python3 simulate_fmg_flower.py [path/to/SPX_XSP_0DTE_ACTIVE_RULES.json]
"""
import json, sys
from pathlib import Path

def load_rules(path):
    d=json.loads(Path(path).read_text())
    assert d["schema_version"]=="1.0" and d["status"]=="RESEARCH_ONLY_NOT_LIVE"
    assert d["gross_expiration_profit_floor_usd"]==500
    assert d["gross_global_expiration_loss_cap_usd"]==300
    return d

def payoff(legs, credit, spot):
    # legs: (right, strike, quantity), long positive, short negative
    intrinsic=sum(q*max(0, strike-spot) if right=="P" else q*max(0,spot-strike) for right,strike,q in legs)
    return round(credit+100*intrinsic, 8)

def analyze(legs, credit):
    strikes=sorted(set(s for _,s,_ in legs))
    samples=[strikes[0]-1000,*strikes,strikes[-1]+1000]
    results=[payoff(legs,credit,x) for x in samples]
    return {"max_profit":max(results),"max_loss":max(0,-min(results)),"min_payoff":min(results),"breakpoints":dict(zip(map(str,samples),results))}

def evaluate(packet, rules, legs, credit, fresh_quotes):
    if packet.get("schema_version")!="1.0" or packet.get("research_rules_id")!=rules["rules_id"]:
        return "REJECT_PACKET_VERSION"
    if packet.get("direction") not in rules["strategy_families"]:
        return "REJECT_DIRECTION"
    if packet["direction"]=="DATA_INCOMPLETE":
        return "REJECT_DATA_INCOMPLETE"
    if not fresh_quotes:
        return "REJECT_STALE_QUOTES"
    a=analyze(legs,credit)
    if a["max_profit"]<rules["gross_expiration_profit_floor_usd"]:
        return "REJECT_PROFIT_FLOOR"
    if a["max_loss"]>rules["gross_global_expiration_loss_cap_usd"]:
        return "REJECT_LOSS_CAP"
    return "QUALIFIED_FOR_HUMAN_REVIEW_ONLY"

def run(rules):
    # V3.0 long 751P, short 755P, short 760C, long 763C;
    # long 755P, short 757P, short 760C, long 763C;
    # long 755P, short 757P, short 761C, long 763C.
    legs=[("P",751,1),("P",755,-1),("C",760,-1),("C",763,1),
          ("P",755,1),("P",757,-1),("C",760,-1),("C",763,1),
          ("P",755,1),("P",757,-1),("C",761,-1),("C",763,1)]
    packet={"schema_version":"1.0","research_rules_id":rules["rules_id"],"direction":"UNCLEAR"}
    tests=[
      ("baseline_502",packet,502,True,"QUALIFIED_FOR_HUMAN_REVIEW_ONLY"),
      ("premium_450",packet,450,True,"REJECT_PROFIT_FLOOR"),
      ("premium_400",packet,400,True,"REJECT_PROFIT_FLOOR"),
      ("stale_quotes",packet,502,False,"REJECT_STALE_QUOTES"),
      ("missing_data",{**packet,"direction":"DATA_INCOMPLETE"},502,True,"REJECT_DATA_INCOMPLETE"),
      ("version_mismatch",{**packet,"research_rules_id":"old"},502,True,"REJECT_PACKET_VERSION")]
    for name,p,c,f,expected in tests:
        result=evaluate(p,rules,legs,c,f)
        assert result==expected,(name,result,expected)
        print("PASS",name,result)
    a=analyze(legs,502)
    assert a["max_profit"]==502 and a["max_loss"]==298,a
    print("PASS expiration payoff baseline max_profit=502 max_loss=298")
    print("SIMULATION PASS 7/7; no live quotes, broker connection or real orders")

if __name__=="__main__":
    default=Path(__file__).resolve().parent.parent/"SPX_XSP_0DTE_ACTIVE_RULES.json"
    run(load_rules(sys.argv[1] if len(sys.argv)>1 else default))
