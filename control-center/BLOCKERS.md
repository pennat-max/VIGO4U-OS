# Blockers

## Active Blockers
None for the deployed CEO Dashboard URL.

## Production Launch Blockers
- Real Google identity to role mapping is not implemented yet. Current role selector is a demo/test governance control, not a production authentication system.
- Real Google Drive binary upload is not implemented yet. Current document workflow validates metadata and Drive URLs in Google Sheets.
- `clasp run setup` still requires Apps Script executable API permission, but the deployed Web App opens and runs.

## Known Risks
- MVP uses Google Sheets and demo seed fallback; production data ownership, backup, and governance still need a runbook.
- Customer role filtering requires a trusted customer id mapping from the authenticated user before production use.
- Future screens must follow `design/DESIGN_SYSTEM.md` and add visible labels through the i18n dictionary before UI expansion.

## Required User Action
None for opening the current deployed dashboard.
