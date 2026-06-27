# QA Gate

## Gate Rule
No mission is done until it has evidence for implementation, testing, reporting, commit, and push.

## Required Checks
- Syntax checks pass for changed code.
- Deployed URL returns HTTP 200 when deployment changes.
- Role visibility is checked when permissions change.
- Drive upload behavior is checked when document logic changes.
- `docs/QA_CHECKLIST.md` is updated when production behavior changes.
- `control-center/BLOCKERS.md` is updated when any blocker remains.

## Current QA State
- Code syntax checks passed for `Code.gs` and embedded browser JavaScript after the version 14 hardening patch.
- Live Web App version `@14` returns HTTP 200.
- Full production QA is blocked until CEO-approved user mapping and Google authorization are completed.

## QA Evidence To Capture Later
- Screenshots or notes for Admin, Finance, Staff, Customer views.
- AuditLog rows after create/update actions.
- Drive upload record with Drive file ID and document metadata row.
- Unknown Google user denied in `GOOGLE_USER_MAPPING` mode.
- Customer sees only own records.
- Staff sees no payment, statement, profit, or profit-sharing data.
