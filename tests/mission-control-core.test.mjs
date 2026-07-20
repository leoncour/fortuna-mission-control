import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  CONSEQUENTIAL_ACTIONS,
  INVALID_EVIDENCE_STATES,
  evaluateScenario,
  scenarios,
} from "../app/mission-control-core.mjs";

test("normal evidence preserves human final authority", () => {
  const view = evaluateScenario(scenarios.normal);
  assert.equal(view.invalidCount, 0);
  assert.equal(view.failClosed, false);
  assert.equal(view.actionState, "HUMAN REVIEW");
  assert.equal(view.gateLabel, "HUMAN APPROVAL REQUIRED");
});

test("stale evidence fails closed across all five consequential actions", () => {
  const view = evaluateScenario(scenarios.degraded);
  assert.equal(view.invalidCount, 1);
  assert.equal(view.failClosed, true);
  assert.equal(view.actionState, "BLOCKED");
  assert.equal(CONSEQUENTIAL_ACTIONS.length, 5);
});

test("unknown and conflicting evidence trigger Manual Survival", () => {
  const view = evaluateScenario(scenarios.manual);
  assert.equal(view.mode, "MANUAL_SURVIVAL");
  assert.equal(view.invalidCount, 2);
  assert.equal(view.failClosed, true);
  assert.equal(INVALID_EVIDENCE_STATES.has("UNKNOWN"), true);
  assert.equal(INVALID_EVIDENCE_STATES.has("CONFLICTED"), true);
});

test("fresh reconciliation requires a human-reviewed recovery transition", () => {
  const view = evaluateScenario(scenarios.manual, true);
  assert.equal(view.mode, "RECOVERY_REVIEW");
  assert.equal(view.failClosed, false);
  assert.equal(view.recoveryEligible, true);
  assert.equal(view.actionState, "HUMAN REVIEW");
});

test("public interface states the synthetic and human-authority boundaries", async () => {
  const source = await readFile(new URL("../app/MissionControl.tsx", import.meta.url), "utf8");
  assert.match(source, /Synthetic demonstration/);
  assert.match(source, /No broker connection/);
  assert.match(source, /No real financial data/);
  assert.match(source, /No execution authority/);
  assert.match(source, /Human approval preserved/);
  assert.doesNotMatch(source, /password|api[_-]?key|credential\s*[:=]/i);
});
