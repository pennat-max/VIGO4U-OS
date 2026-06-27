# Blockers

## Active Blockers

Google authorization is required.

Apps Script version 7 now uses `SpreadsheetApp` for the Customer Module. The Customer Module deployment returns `403 Forbidden` until the owner account authorizes the new Google Sheets scope.

Blocked Customer Module URL:

`https://script.google.com/macros/s/AKfycbzm53mqUjgPjF2Yn_U6DvEFvcdxdgztsNDbq_BmMN5TZYIqPT11Ik8FLG01XsUOp_OZfA/exec`

The existing public CEO Dashboard remains open at:

`https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`

## Known Risks

- Dashboard Customer stats now depend on the Customer sheet.
- Demo customer seed runs from Apps Script after authorization.
- Vehicle, invoice, payment, allocation, and customer statement modules are not connected yet.
- Staff/Finance/Admin role permissions must be defined before real financial data is exposed.
- `clasp run setup` returned: `Unable to run script function. Please make sure you have permission to run the script function.`

## Required User Action

Open the Apps Script deployment as the owner account and approve the requested Google authorization scopes.
