# MISSION

Current mission: Full ERP MVP complete.

Goal: Mission queue 001-011 completed for MVP.

## Completed Modules
- CEO Dashboard
- Customer Module
- Vehicle Module
- Invoice Module
- Payment Module
- Allocation Module
- Customer Statement
- Workshop Module
- Documents Module
- Reports Module
- QA and Deployment smoke verification

## Current Deployed URL
`https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`

## Architecture Rules Preserved
- UI uses service layer.
- Service layer uses repository layer.
- Repository handles Google Sheets.
- Stable IDs are used for business records.
- Header mapping is used.
- Row numbers are not used as business IDs.
- One customer has many invoices.
- One invoice has many vehicles.
- One payment can allocate across invoice items or vehicles.
- Pending and rejected workshop costs do not affect totals.
- Profit sharing is 40% owner and 60% VIGO.

## Next Phase
Production hardening: role-based UI enforcement, audit log, stronger validation, real Drive upload flow, and production data migration planning.
