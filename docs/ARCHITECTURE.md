# ARCHITECTURE

## Current MVP Stack
- Google Apps Script
- Apps Script Web App
- Google Sheets
- Google Drive
- Mobile-first HTML/CSS/JavaScript

## Future Migration Target
- Supabase
- PostgreSQL
- Next.js

## Layering Rule
All business features must follow this structure:

1. UI Layer
2. Service Layer
3. Repository Layer
4. Google Sheets Repository
5. Google Drive Repository

## Current App Source
- `VIGO4U-OS-CEO-Dashboard/Code.gs`
- `VIGO4U-OS-CEO-Dashboard/Index.html`
- `VIGO4U-OS-CEO-Dashboard/appsscript.json`

## Data Storage
Google Sheets tables:
- `Customers`
- `Vehicles`
- `Invoices`
- `InvoiceItems`
- `Payments`
- `PaymentAllocations`
- `WorkOrders`
- `WorkshopCosts`
- `Documents`
- `AuditLog`
- `Users`

## Identity And Permissions
Current deployment supports:
- Demo role selector mode: `DEMO_ROLE_SELECTOR`
- Production mapping infrastructure: `GOOGLE_USER_MAPPING`

Production launch requires signed-in Google users mapped through the `Users` sheet.

## Document Storage
- Google Drive stores files.
- Google Sheets stores document metadata and URLs.
- Internal/staff documents remain private.
- Customer-visible documents are shared by link only when visibility is `customer`.

## ID Rules
- Never use spreadsheet row numbers as business IDs.
- Always use stable IDs.
- Always use header mapping.
