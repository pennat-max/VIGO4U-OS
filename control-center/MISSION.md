# MISSION

Current mission: Production Hardening Gate 001

Goal: make the deployed VIGO4U OS MVP safer and closer to real production use before adding more features.

## Current State
MVP modules 001-011 are complete and deployed with bilingual TH/EN support.

Live URL:
`https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`

## Hardening Scope
1. Role enforcement in UI and API
   - Admin sees everything.
   - Finance sees finance workflows only.
   - Staff must not see buy price, sale price, profit, customer statement, customer payments, or profit sharing.
   - Customer sees own invoices, vehicles, documents, payments, and balance only.

2. Audit log
   - Record create/update/delete or approval actions.
   - Include timestamp, user/role, entity type, entity id, action, before/after summary where practical.

3. Data validation
   - Validate required IDs and amounts.
   - Prevent negative payments/costs.
   - Prevent double-counted approved workshop costs.
   - Validate invoice/payment/allocation relationships.

4. Document handling
   - Keep metadata and Drive URL in Sheets.
   - Prepare real Drive upload path or document the exact blocker.

5. Demo fallback governance
   - Keep demo seed fallback safe.
   - Make production/test mode clear in UI.

6. QA checklist
   - Add manual QA cases for all major flows.
   - Update CURRENT_STATUS, DAILY_REPORT, NEXT_ACTION, and BLOCKERS.

## Do Not Do Yet
- Do not add new business modules.
- Do not redesign the whole app.
- Do not migrate to Supabase yet.

## Done Means
- Production risks above are implemented or clearly documented as blockers.
- Status files are updated.
- App is redeployed if code changed.
- GitHub has latest commit pushed.
