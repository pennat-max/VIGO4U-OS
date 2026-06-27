# Roll Out Plan

## Stage 1: Factory MVP
Status: Done

- Create AI Factory operating docs.
- Add GitHub issue and PR templates.
- Synchronize control-center status files.

## Stage 2: Production Authorization
Status: Blocked

Required:
- CEO provides approved Google account-role mapping.
- Production deployment settings approved.
- Google authorization completed if Drive upload prompts.

## Stage 3: Production QA
Status: Blocked

Required:
- Enable `GOOGLE_USER_MAPPING`.
- Populate `Users` sheet.
- Run `docs/QA_CHECKLIST.md`.
- Fix all failed checks.

## Stage 4: Security Review
Status: Blocked

Required:
- Verify role isolation.
- Verify Drive sharing policy.
- Verify audit coverage.
- Verify deployment settings.

## Stage 5: Production Completion
Status: Blocked

Required:
- No critical blockers.
- QA passed.
- Security review passed.
- Production deployment approved.
- `docs/PROJECT_STATUS.md` updated to `PROJECT COMPLETED`.
