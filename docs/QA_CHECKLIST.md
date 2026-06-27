# QA_CHECKLIST

Date: 2026-06-27

## Scope
Use this checklist before production approval for the deployed Apps Script Web App.

Live URL:
`https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`

## Access And Roles
- [ ] Admin can see dashboard, customers, vehicles, invoices, payments, workshop, documents, reports, finance summary, and profit sharing.
- [ ] Finance can see invoice, payment, allocation, statement, and finance/report data only.
- [ ] Staff cannot see payments, customer statements, finance summary, profit, or profit sharing.
- [ ] Staff can see assigned workshop work and internal/staff documents only.
- [ ] Customer can see own invoices, vehicles, customer-visible documents, payments, and balance only.
- [ ] Unknown Google user is denied after `GOOGLE_USER_MAPPING` auth mode is enabled.

## Data Validation
- [ ] Invoice cannot be created without a valid customer and at least one item.
- [ ] Payment cannot be created with zero or negative amount.
- [ ] Allocation cannot exceed remaining payment amount.
- [ ] Allocation cannot exceed remaining invoice balance.
- [ ] Workshop cost cannot be negative.
- [ ] Staff cannot approve workshop costs.
- [ ] Duplicate approved workshop cost is blocked.

## Documents And Drive
- [ ] Document metadata can be saved with a valid Google Drive URL.
- [ ] Local file upload creates a Drive file and a document metadata record.
- [ ] Internal/staff uploads remain private.
- [ ] Customer-visible uploads are shared by link only when visibility is `customer`.
- [ ] First upload authorization is completed by the production Google account.

## Audit Log
- [ ] Customer save writes an `AuditLog` row.
- [ ] Vehicle save writes an `AuditLog` row.
- [ ] Invoice save writes an `AuditLog` row.
- [ ] Payment save writes an `AuditLog` row.
- [ ] Allocation save writes an `AuditLog` row.
- [ ] Work order and workshop cost saves write `AuditLog` rows.
- [ ] Document metadata/upload saves write `AuditLog` rows.

## Deployment
- [ ] Web App returns HTTP 200 on mobile and desktop.
- [ ] Deployment version matches control-center status.
- [ ] Google user-to-role mapping is configured in the `Users` sheet.
- [ ] Production deployment access/execute-as settings are approved.
- [ ] No critical blocker remains in `control-center/BLOCKERS.md`.
