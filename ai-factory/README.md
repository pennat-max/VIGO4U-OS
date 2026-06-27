# TONY AI Factory

TONY AI Factory is the mission engine around VIGO4U OS.

Purpose:
- Stop relying on one-off chat prompts.
- Give AI agents a single operating protocol.
- Let Codex, Manus, ChatGPT, and future agents work from the same source of truth.
- Make GitHub the control room.

This is not a replacement for VIGO4U OS.
It is the operating layer that coordinates AI work until VIGO4U OS reaches production readiness.

## Current MVP Goal
Build a GitHub-based Mission Server first.

The first version does not need a complex backend.
It must define:
- Mission queue
- Agent protocol
- Status reporting
- Blocker handling
- QA handoff
- Completion criteria

## Core Rule
Agents must not finish with local-only output.
All work must be committed, pushed, and reported in GitHub.

## MVP Files
- `PROJECT_STATUS.md`: current factory and VIGO4U OS readiness state.
- `MISSION_QUEUE.md`: ordered work queue for agents.
- `AGENT_PROTOCOL.md`: rules every agent must follow.
- `MISSION_BOARD.md`: active board with owner, status, and blockers.
- `QA_GATE.md`: required checks before a mission can be marked done.
- `ROLL_OUT_PLAN.md`: path from blocked MVP to production-ready system.

## GitHub Control Room
GitHub issues and pull requests are the operating surface. Agents should:
- Convert open work into GitHub issues or mission-board rows.
- Work one mission at a time.
- Commit and push every completed mission.
- Update `control-center/` and `ai-factory/` before stopping.
- Stop only for human approval, login, external account access, or production approval.
