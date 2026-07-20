# Fortuna Mission Control

> Most financial AI tries to generate more recommendations. Fortuna demonstrates the harder safety problem: knowing when the AI must stop.

[Live synthetic demo](https://fortuna-safety-mission-control.elrondchen.chatgpt.site) | [2:27 demo video](https://youtu.be/pz3LYWBHJ0s)

Fortuna Mission Control is a synthetic, privacy-safe demonstration of evidence reconciliation, fail-closed action gating, and preserved human authority. It is an isolated public demonstration layer created for OpenAI Build Week 2026 in the **Work & Productivity** category.

## What the demo shows

- Four distinct evidence checks are mandatory.
- Missing, stale, failed, or conflicting evidence cannot display as a pass.
- Invalid evidence blocks five consequential actions.
- Manual Survival isolates automation when authoritative state is unavailable.
- Fresh evidence makes recovery eligible for human review; it never restores authority automatically.
- No consequential action is approved, scheduled, prepared, or executed by the demo.

All names, times, records, and scenarios in this repository are fictional. The app has no broker connection, credentials, private repository connection, or real financial data.

## Judge quick start

The fastest way to test Fortuna is the [hosted demo](https://fortuna-safety-mission-control.elrondchen.chatgpt.site):

1. Select **Normal** and confirm that all four checks are fresh while final authority remains human-only.
2. Select **Degraded** and confirm that one stale record blocks all five consequential actions.
3. Select **Manual Survival** and confirm that unknown and conflicting evidence keep the action gate locked.
4. Select **Run synthetic reconciliation** and confirm that recovery becomes eligible for human review without an automatic mode transition.

No account, test credentials, external service, or sample-data download is required.

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
git clone https://github.com/leoncour/fortuna-mission-control.git
cd fortuna-mission-control
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Test and build

```bash
npm test
npm run build
```

For the full release check:

```bash
npm run check
```

## Architecture

```text
Synthetic scenario
       |
Four mandatory evidence checks
       |
Deterministic validation
       |
Fail-closed action gate
       |
Human review boundary
```

The evaluator in `app/mission-control-core.mjs` is deterministic. The runtime does not call an AI model and does not produce trading decisions.

## How Codex and GPT-5.6 were used

The project began from an existing private operational concept. During Build Week, Codex with GPT-5.6 helped:

1. separate the public synthetic demo from the private authoritative system;
2. preserve the four-evidence contract and fail-closed invariants;
3. create fictional Normal, Degraded, Manual Survival, and recovery scenarios;
4. translate the safety rules into deterministic JavaScript and acceptance tests;
5. implement the interactive judge-facing web experience;
6. prepare the public documentation, hosted demo, and video walkthrough; and
7. keep broker, capital, scheduler, automation, order-preparation, and execution authority explicitly absent.

Key design decisions were made around evidence freshness, conflict handling, fail-closed behavior, recovery eligibility, public disclosure, and the human approval boundary. Codex accelerated implementation and verification; GPT-5.6 supported the reasoning across those interacting constraints.

Codex Session ID: `019f7afd-99be-7a10-84c5-9f6fbff8d983`

## Safety and disclosure boundary

```text
TRADING_AUTHORITY_CHANGE = NO
CAPITAL_AUTHORITY_CHANGE = NO
BROKER_ACCESS = NO
SCHEDULER_AUTHORITY = NO
AUTOMATION_AUTHORITY = NO
ORDER_PREPARATION = NO
EXECUTION_AUTHORITY = NO
HUMAN_FINAL_AUTHORITY = PRESERVED
```

The private system, its history, and its operational data are not included or required.

## Repository map

- `app/MissionControl.tsx` - interactive demonstration interface
- `app/mission-control-core.mjs` - deterministic scenario evaluator and action gate
- `tests/mission-control-core.test.mjs` - safety-invariant acceptance tests
- `public/og.png` - public project preview image

## License

MIT - see [LICENSE](LICENSE).
