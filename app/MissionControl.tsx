"use client";

import { useMemo, useState } from "react";
import {
  CONSEQUENTIAL_ACTIONS,
  evaluateScenario,
  scenarios,
} from "./mission-control-core.mjs";

type ScenarioKey = keyof typeof scenarios;

const scenarioOrder: ScenarioKey[] = ["normal", "degraded", "manual"];

export function MissionControl() {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("degraded");
  const [reconciled, setReconciled] = useState(false);
  const view = useMemo(
    () => evaluateScenario(scenarios[activeScenario], reconciled),
    [activeScenario, reconciled],
  );

  function selectScenario(next: ScenarioKey) {
    setActiveScenario(next);
    setReconciled(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fortuna Mission Control home">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span><strong>Fortuna</strong><small>Mission Control</small></span>
        </a>
        <div className="top-meta">
          <span className="synthetic-badge">Synthetic demonstration</span>
          <span className="authority-badge"><i /> Human authority active</span>
        </div>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Safety is a system state</p>
          <h1>Know when the AI<br />must stop.</h1>
          <p className="thesis">
            <strong>Fortuna reconciles evidence before consequential action.</strong>{" "}
            Missing, stale, or conflicting inputs become unknown—automatically
            blocking action until fresh evidence is reviewed by a human.
          </p>
        </div>
        <div className={`system-state ${view.failClosed ? "danger" : "safe"}`} aria-live="polite">
          <small>Current operating state</small>
          <strong>{view.mode.replaceAll("_", " ")}</strong>
          <span>{view.gateLabel}</span>
        </div>
      </section>

      <section aria-labelledby="scenario-title">
        <div className="section-intro">
          <div>
            <p className="section-kicker">Interactive walkthrough</p>
            <h2 id="scenario-title">Change the evidence. Watch the safety state change.</h2>
          </div>
          <p>{view.trigger}</p>
        </div>
        <nav className="scenario-tabs" aria-label="Synthetic scenario selector">
          {scenarioOrder.map((key) => (
            <button
              className="scenario-tab"
              key={key}
              onClick={() => selectScenario(key)}
              aria-pressed={activeScenario === key}
            >
              {scenarios[key].label}
            </button>
          ))}
        </nav>
      </section>

      <section className="workspace">
        <article className="panel evidence-panel">
          <header className="panel-head">
            <div>
              <p className="panel-label">Evidence reconciliation</p>
              <h2>Four distinct checks are mandatory</h2>
            </div>
            <span className={view.invalidCount ? "counter counter-warn" : "counter"}>
              {view.verifiedCount} verified · {view.invalidCount} invalid
            </span>
          </header>

          <div className="evidence-list">
            {view.evidence.map((item, index) => (
              <div className="evidence-row" key={item.id}>
                <span className={`node ${item.status !== "FRESH" ? "node-warn" : ""}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.owner} · {item.observedAt}</p>
                </div>
                <div className="source-copy">
                  <strong>{item.source}</strong>
                  <span>{item.detail}</span>
                </div>
                <span className={`status status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flow" aria-label="Evidence processing flow">
            <span>Observe</span><i>→</i><span>Validate</span><i>→</i>
            <span>Reconcile</span><i>→</i><span>Gate action</span>
          </div>
        </article>

        <aside className="side-rail">
          <article className={`panel gate-panel ${view.failClosed ? "gate-locked" : "gate-review"}`}>
            <header className="panel-head compact">
              <div><p className="panel-label">Action gate</p><h2>Fail-closed protection</h2></div>
              <span className="gate-chip">{view.failClosed ? "LOCKED" : "REVIEW"}</span>
            </header>
            <div className="gate-summary">
              <strong>{view.failClosed ? "5 actions blocked" : "Human decision required"}</strong>
              <p>{view.gateReason}</p>
            </div>
            <ul className="action-list">
              {CONSEQUENTIAL_ACTIONS.map((action) => (
                <li key={action}><span>{action}</span><b>{view.actionState}</b></li>
              ))}
            </ul>
          </article>

          <article className="panel recovery-panel">
            <p className="panel-label">Recovery drill</p>
            <h2>{view.recoveryEligible ? "Fresh evidence restored" : "Reconcile authoritative evidence"}</h2>
            <p>
              {view.recoveryEligible
                ? "Recovery is eligible for human review. No automatic mode transition occurs."
                : "Simulate a fresh authoritative readback for all four evidence checks."}
            </p>
            <button
              className="reconcile-button"
              onClick={() => setReconciled((current) => !current)}
              disabled={activeScenario === "normal"}
            >
              {reconciled ? "Reset synthetic evidence" : "Run synthetic reconciliation"}
            </button>
          </article>

          <article className="panel authority-panel">
            <span className="shield" aria-hidden="true">H</span>
            <div>
              <h2>Human approval preserved</h2>
              <p>Fortuna may reconcile and recommend. It cannot approve, schedule, prepare, or execute a consequential action.</p>
              <div className="authority-rule"><span>Final authority</span><strong>Human only</strong></div>
            </div>
          </article>
        </aside>
      </section>

      <section className="boundary-panel" aria-labelledby="boundary-title">
        <div>
          <p className="section-kicker">Public demo boundary</p>
          <h2 id="boundary-title">Designed to reveal the safety model—not private operations.</h2>
        </div>
        <ul>
          <li>No broker connection</li><li>No real financial data</li>
          <li>No order preparation</li><li>No execution authority</li>
        </ul>
      </section>

      <footer>
        <span>Fortuna Mission Control · OpenAI Build Week 2026</span>
        <span>Scenario data is entirely fictional</span>
      </footer>
    </main>
  );
}
