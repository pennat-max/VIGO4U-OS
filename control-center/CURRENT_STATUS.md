# Current Status

Date: 2026-06-27

## Project
VIGO4U-OS

## Mission
Production readiness loop

## Branch
`master`

## Status
Production hardening is continuing. The deployed dashboard is operational, but production launch is blocked by Google authorization/approval items listed in `BLOCKERS.md`.

The public CEO Dashboard now runs version 14 with bilingual TH/EN support, ERP MVP modules, role-aware UI/API filtering, audit logging, validation, Drive upload path code, and Google user-to-role mapping infrastructure.

## Dashboard
- Type: Google Apps Script Web App
- UI language: Thai and English
- Design system: `design/DESIGN_SYSTEM.md`
- Data mode: Google Sheets ERP data with safe demo seed fallback
- Layout: Mobile-first, dark mode, card layout, large buttons
- Live URL: `https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`
- Live Apps Script deployment: `AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ @14`
- Verification: `HTTP 200`; markers detected for `Production Hardening Gate`, `roleSelect`, `apiUploadDocument`, `documentFile`, and `fileToUpload`

## Production Hardening Implemented
- TONY AI Factory MVP for GitHub-based mission control.
- Role selector for Admin, Finance, Staff, and Customer demo views.
- API sanitizers and write guards for role permissions.
- Staff finance/profit/payment/statement restrictions.
- Customer data scoping when trusted customer id mapping is available.
- `AuditLog` sheet schema and audit logging for create/update actions.
- Validation for invoices, payments, allocations, workshop costs, documents, and duplicate approved costs.
- `Users` sheet schema and `GOOGLE_USER_MAPPING` auth mode infrastructure.
- Drive upload path: local file upload creates a Drive file and stores document metadata in Sheets.
- Drive file visibility handling: internal/staff files remain private; customer-visible uploads are shared by link.
- Production QA checklist: `docs/QA_CHECKLIST.md`.
- AI Factory mission control files: `ai-factory/`.
- Role-context response hardening: workshop work order saves now reload ERP data through the caller role context instead of defaulting to admin context.

## Remaining Production Risks
- CEO must provide/approve the Google account to role mapping for the `Users` sheet.
- Production deployment must be approved for signed-in Google-user access before `GOOGLE_USER_MAPPING` can be enabled.
- First real Drive upload may require Google authorization for Drive permissions.
- `clasp run setup` still requires Apps Script executable API permission, but the deployed Web App opens and runs.

## GitHub
- Remote: `https://github.com/pennat-max/VIGO4U-OS.git`
- Push target: `origin/master`

## Approval
Blocked before production launch by Google authorization, production deployment approval, and CEO user-role mapping decision.
