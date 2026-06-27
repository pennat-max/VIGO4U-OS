# Agent Protocol

## Prime Directive
GitHub is the control room. Do not rely on chat memory as the source of truth.

## Start Procedure
Every agent run must:
1. Pull latest `master`.
2. Read `ai-factory/PROJECT_STATUS.md`.
3. Read `ai-factory/MISSION_QUEUE.md`.
4. Read `ai-factory/MISSION_BOARD.md`.
5. Read `control-center/CURRENT_STATUS.md`.
6. Read `control-center/BLOCKERS.md`.
7. Read `design/DESIGN_SYSTEM.md` before UI work.

## Work Procedure
- Select the highest-priority unblocked mission.
- Keep changes scoped.
- Follow the Apps Script architecture:
  - UI Layer
  - Service Layer
  - Repository Layer
  - Google Sheets Repository
  - Google Drive Repository
- Never use spreadsheet row numbers as business IDs.
- Always use stable IDs and header mapping.
- Preserve TH/EN support.
- Preserve mobile-first dark mode.
- Preserve staff finance visibility restrictions.

## Stop Conditions
Stop only if:
- GitHub permission is required.
- Google authorization is required.
- API credentials are required.
- CEO business decision is required.
- Production deployment approval is required.

## End Procedure
Before stopping:
- Run available tests/checks.
- Commit.
- Push.
- Update `control-center/CURRENT_STATUS.md`.
- Update `control-center/DAILY_REPORT.md`.
- Update `control-center/NEXT_ACTION.md`.
- Update `control-center/BLOCKERS.md`.
- Update `ai-factory/PROJECT_STATUS.md`.
- Update `ai-factory/MISSION_BOARD.md`.
