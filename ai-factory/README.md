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
