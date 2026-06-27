# TONY AI Factory Mission Queue

## Operating Rule
Agents must work top to bottom, skipping only missions marked `Blocked`.

## Mission AF-001: AI Factory MVP
Status: Done
Goal: Create GitHub-based mission control files so agents can continue from repository state.

Done means:
- `ai-factory/PROJECT_STATUS.md` exists.
- `ai-factory/MISSION_QUEUE.md` exists.
- `ai-factory/AGENT_PROTOCOL.md` exists.
- `ai-factory/MISSION_BOARD.md` exists.
- `ai-factory/QA_GATE.md` exists.
- `ai-factory/ROLL_OUT_PLAN.md` exists.
- GitHub issue and PR templates exist.

## Mission AF-002: Production Authorization Package
Status: Blocked
Goal: Collect CEO-approved Google accounts and roles, approve signed-in deployment settings, and enable production auth mode.

Blocker:
- Human approval and Google account access are required.

## Mission AF-003: Production QA Execution
Status: Blocked
Goal: Run `docs/QA_CHECKLIST.md` against the production auth deployment and record pass/fail evidence.

Blocker:
- Requires AF-002.

## Mission AF-004: Security Review
Status: Blocked
Goal: Review role permissions, customer/staff data isolation, Drive file sharing, audit log coverage, and deployment settings.

Blocker:
- Requires production auth mode and QA environment.

## Mission AF-005: Production Completion
Status: Blocked
Goal: Clear all critical blockers, update `docs/PROJECT_STATUS.md` to `PROJECT COMPLETED`, and publish final report.

Blocker:
- Requires QA pass, security pass, and production deployment approval.
