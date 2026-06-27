# ROADMAP

## Phase 1: ERP MVP
Status: Done

- CEO dashboard
- Customer module
- Vehicle module
- Invoice module
- Payment module
- Allocation module
- Customer statement
- Workshop module
- Documents metadata
- Reports
- TH/EN support

## Phase 2: Production Hardening
Status: Mostly done, blocked before final production launch

- Role-aware UI/API filtering: Done
- Audit log: Done
- Validation hardening: Done
- Drive upload path: Done
- Google user-role mapping infrastructure: Done
- Production QA checklist: Done
- Signed-in deployment approval: Blocked
- CEO user-role mapping data: Blocked
- First Drive authorization: Blocked

## Phase 3: Production Launch
Status: Blocked

Required before launch:
- Populate `Users` sheet.
- Enable `GOOGLE_USER_MAPPING`.
- Approve production Web App access and execute-as settings.
- Run QA checklist.
- Fix QA failures.
- Confirm no critical blockers.

## Phase 4: Post-Launch Stabilization
Status: Not started

- Backup and restore runbook.
- Operational monitoring.
- Performance tuning.
- Error reporting and support process.
## Phase 5: Future Migration
Status: Not started

Future target stack:
- Supabase
- PostgreSQL
- Next.js
