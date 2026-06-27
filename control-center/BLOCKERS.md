# Blockers

## Active Blockers
Production launch is blocked.

## Required CEO Decision
- Provide/approve the Google account-to-role mapping for the `Users` sheet.
- Required columns: `email`, `display_name`, `role`, `customer_id`, `staff_name`, `status`.
- Valid roles: `admin`, `finance`, `staff`, `customer`.

## Required Google Authorization
- First real Drive upload may require Google authorization because the app now creates Drive files.
- `clasp run setup` still requires Apps Script executable API permission.

## Required Production Deployment Approval
- Approve switching from demo role selector mode to `GOOGLE_USER_MAPPING`.
- Approve signed-in Google user deployment settings before public production use.

## Not Blocked
- The current dashboard URL opens.
- Version 13 is deployed.
- Role filter code exists.
- Audit log code exists.
- Validation code exists.
- Drive upload path code exists.
- User-role mapping infrastructure exists.
- TONY AI Factory MVP exists in `ai-factory/`.
- GitHub issue and PR templates exist for mission control.

## Required User Action
Provide the approved Google user-role list and approve Google authorization/deployment settings for production.
