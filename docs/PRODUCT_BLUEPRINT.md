# PRODUCT_BLUEPRINT

## Product
VIGO4U OS is an ERP for used car export operations.

## Primary Users
- CEO/Admin
- Finance
- Staff
- Customer

## Business Modules
- Dashboard
- CRM / Customers
- Vehicles
- Purchasing
- Workshop
- Documents
- Export
- Finance
- Customer Portal
- Profit Sharing
- Reports
- Settings

## MVP Modules Implemented
- Dashboard
- Customers
- Vehicles
- Invoices
- Payments
- Allocations
- Customer Statements
- Workshop
- Documents
- Reports

## Core Business Rules
- One customer has many invoices.
- One invoice has many vehicles.
- One payment can be allocated across many invoice items or vehicles.
- Payments support partial payment, overpayment, customer credit, allocation, and statement.
- Profit sharing is 40% owner and 60% VIGO.
- Vehicle costs update totals only after approval.
- Pending and rejected workshop costs do not affect totals.
- Staff must never see buy price, sale price, profit, customer statement, customer payments, or profit sharing.

## Production Readiness Standard
The project is production-ready only after:
- Production deployment is approved.
- Security review passes.
- QA passes.
- No critical blocker remains.
- GitHub and control-center documents are synchronized.
