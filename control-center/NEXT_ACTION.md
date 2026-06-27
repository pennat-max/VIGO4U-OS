# NEXT ACTION

## Immediate
All currently implementable code hardening has been deployed to version `@14`. Continue only after the CEO/Google authorization blockers are cleared.

Required decisions/actions:
- Provide the Google accounts and roles for the `Users` sheet.
- Approve production deployment settings for signed-in Google users and `GOOGLE_USER_MAPPING` auth mode.
- Complete Google Drive authorization if the first real file upload prompts for permission.
- Use `ai-factory/` as the GitHub mission control layer for the next agent run.

## Current Mission
Production readiness loop is blocked only at the final authorization and production approval stage.

## Ready For QA
Use `docs/QA_CHECKLIST.md` after the blockers are cleared.

## Recommended Next Phase After Approval
- Populate the `Users` sheet with approved accounts.
- Enable `GOOGLE_USER_MAPPING` in Script Properties.
- Redeploy with approved production access/execute-as settings.
- Run the production QA checklist on mobile and desktop.
- Fix any QA failures.
- Commit, push, deploy, and update all control-center status files.

## Must Do Before Stopping Future Work
- Commit completed work.
- Push to GitHub.
- Update control-center status files.
- Verify the deployed URL.
