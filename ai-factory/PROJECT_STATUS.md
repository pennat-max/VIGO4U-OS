# TONY AI Factory Project Status

Date: 2026-06-27

## Status
MVP ACTIVE

TONY AI Factory is now the GitHub-based mission control layer for VIGO4U OS. It does not replace the ERP. It coordinates agents, mission selection, QA gates, blockers, and rollout status from repository files.

## Current Repository
- GitHub: `pennat-max/VIGO4U-OS`
- Branch: `master`
- ERP deployment: VIGO4U OS Web App `@13`
- ERP status: Production blocked by CEO/Google approval items

## Factory MVP Scope
Implemented in this repository:
- Mission queue
- Agent protocol
- Mission board
- QA gate
- Rollout plan
- GitHub issue and PR templates
- Control-center synchronization rules

## Source Of Truth
Agents must start here:
1. `ai-factory/PROJECT_STATUS.md`
2. `ai-factory/MISSION_QUEUE.md`
3. `ai-factory/MISSION_BOARD.md`
4. `control-center/CURRENT_STATUS.md`
5. `control-center/BLOCKERS.md`

## Current Blocker
VIGO4U OS production launch requires:
- CEO-approved Google user-role mapping
- Google authorization for Drive upload if prompted
- Production deployment approval for signed-in Google users
