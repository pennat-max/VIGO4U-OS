# Current Status

Date: 2026-06-27

## Project
VIGO4U-OS

## Mission
Production Hardening Gate 001

## Branch
`master`

## Status
Production Hardening Gate 001 is implemented and deployed.

The public CEO Dashboard now runs version 11 with bilingual TH/EN support, ERP MVP modules, role-aware UI/API filtering, audit logging, validation, and production/test mode markers.

## Dashboard
- Type: Google Apps Script Web App
- UI language: Thai and English
- Design system: `design/DESIGN_SYSTEM.md`
- Data mode: Google Sheets ERP data with safe demo seed fallback
- Layout: Mobile-first, dark mode, card layout, large buttons
- Live URL: `https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`
- Live Apps Script deployment: `AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ @11`
- Verification: `HTTP 200`; markers detected for `Production Hardening Gate`, `roleSelect`, `rolePayload`, `hidden-by-role`, and `apiRunProductionHardeningGate`

## Hardening Implemented
- Role selector for Admin, Finance, Staff, and Customer demo views.
- UI hiding for restricted finance, workshop, customer, vehicle, report, and form areas by role.
- API sanitizers for dashboard, ERP data, customer list/detail, and vehicle list/detail.
- API write guards for customer, vehicle, invoice, payment, allocation, work order, workshop cost, and document metadata.
- Staff cannot access payments, statements, profit sharing, financial workflows, or approve workshop costs.
- Customer view is limited to own invoices, payments, documents, vehicles, and balance when a customer id is provided.
- `AuditLog` sheet schema and audit logging for create/update actions.
- Validation for required IDs, positive payments, non-negative costs, valid invoice/payment/allocation relationships, approved cost approval, duplicate approved workshop costs, and Drive metadata URLs.
- Production gate summary API: `apiRunProductionHardeningGate`.

## Remaining Production Risks
- Real signed-in Google user to role mapping is still required before public production use.
- Real Drive binary upload is still not implemented; current document module validates metadata and Drive URLs.
- `clasp run setup` still requires Apps Script executable API permission, but the deployed Web App opens and runs.

## GitHub
- Remote: `https://github.com/pennat-max/VIGO4U-OS.git`
- Push target: `origin/master`

## Approval
No active approval blocker.
