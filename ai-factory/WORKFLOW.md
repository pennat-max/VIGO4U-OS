# AI Factory Workflow

GitHub is the source of truth for VIGO4U OS.

## Roles

ChatGPT:
- Product direction
- Architecture review
- Mission planning
- QA decisions

Codex:
- Code implementation
- Tests
- Deployment steps
- Status updates

Manus:
- Product review
- UX review
- QA review
- Security and ERP recommendations

## Working Rule
All work must end in GitHub, not only in chat or local files.

Before a task is considered done:
- Update status
- Record blockers
- Record next action
- Push changed files

## Stop Rule
Stop only when human approval or external account access is required.

## Mission Lifecycle
1. Pull latest `master`.
2. Read `ai-factory/PROJECT_STATUS.md`.
3. Read `ai-factory/MISSION_QUEUE.md`.
4. Read `control-center/CURRENT_STATUS.md`, `MISSION.md`, and `BLOCKERS.md`.
5. Select the highest-priority unblocked mission.
6. Implement.
7. Test.
8. Update documentation and status files.
9. Commit.
10. Push.
11. Update the mission board.
12. Continue until blocked or complete.

## Required End State For Every Agent Run
- GitHub is synchronized.
- Changed files are committed and pushed.
- `control-center/` status files are updated.
- `ai-factory/` status files are updated.
- Blockers are explicit and actionable.
