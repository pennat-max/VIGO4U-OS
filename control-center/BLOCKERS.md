# Blockers

## Active Blockers
None.

## Known Risks
- MVP uses Google Sheets and demo seed fallback; production data governance is not complete.
- Staff/Finance/Admin role permissions must be enforced in UI and API before production use.
- Staff must never see buy price, sale price, profit, customer statement, customer payments, or profit sharing.
- Document module stores metadata and Drive URLs; real Drive upload flow is still a production-hardening item.
- Future screens must follow `design/DESIGN_SYSTEM.md` and add visible labels through the i18n dictionary before UI expansion.
- `clasp run setup` still requires executable API permission, but the deployed Web App opens and runs.

## Required User Action
None for the current deployed MVP.
