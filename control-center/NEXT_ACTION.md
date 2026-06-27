# NEXT ACTION

## Immediate
Run manual QA on the deployed version 11 dashboard using each role view:
- Admin: verify all modules and profit sharing are visible.
- Finance: verify finance workflows are visible and non-finance module screens are hidden.
- Staff: verify payments, statements, profit sharing, and finance summary are hidden.
- Customer: verify own invoices, vehicles, documents, payments, and balance only.

## Current Mission
Production Hardening Gate 001 is implemented and deployed.

## Recommended Next Phase
- Add real signed-in Google account to role mapping before public production use.
- Build real Google Drive binary upload flow with Drive file permissions.
- Add a production setup/runbook for Apps Script deployments and spreadsheet ownership.
- Add a manual QA checklist document with pass/fail evidence for all major flows.
- Refine mobile bottom navigation and desktop/sidebar navigation according to `design/DESIGN_SYSTEM.md`.
- Plan future migration to Supabase/PostgreSQL/Next.js after Apps Script MVP is stable.

## Must Do Before Stopping Future Work
- Commit completed work.
- Push to GitHub.
- Update control-center status files.
- Verify the deployed URL.
