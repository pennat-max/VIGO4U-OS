# VIGO4U OS CEO Dashboard

This is the current Google Apps Script Web App for VIGO4U OS.

## Current Status
- Deployment version: `@13`
- Status: Operational MVP, production launch blocked by CEO/Google approval items.
- Data: Google Sheets with safe demo seed fallback.
- Documents: Google Drive upload path plus document metadata in Sheets.
- UI: Mobile-first dark mode with Thai/English support.

## Live Deployment
- Script project: `https://script.google.com/d/1ovvuWV2OaKHMeQvaKKeASUklu519qaEWK5yz1DGp1HA6TGmnKnDolzfj/edit`
- Web App URL: `https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`
- Deployment ID: `AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ`

## Files
- `Code.gs`: Web App entrypoint, service layer, repositories, validation, role enforcement, audit log, Drive upload path.
- `Index.html`: Mobile-first dashboard and ERP UI.
- `appsscript.json`: Apps Script manifest.

## Implemented Modules
- CEO Dashboard
- Customers
- Vehicles
- Invoices
- Payments
- Allocations
- Customer Statements
- Workshop
- Documents
- Reports

## Production Hardening
- Role-aware UI/API filtering
- AuditLog sheet
- Validation guards
- Drive upload path
- Users sheet and `GOOGLE_USER_MAPPING` infrastructure

## Production Blockers
See `../control-center/BLOCKERS.md`.

Production launch requires:
- CEO-approved Google account-to-role mapping.
- Google authorization for Drive upload if prompted.
- Approved signed-in Google user deployment settings.
- QA pass using `../docs/QA_CHECKLIST.md`.
